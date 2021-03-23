import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SubscriptionIcon from "components/common/icons/subscription/SubscriptionIcon";
import adminTagsActions from "components/settings/tags/admin-tags-actions";

function TagSubscriptionIcon({ tagModel, showText, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await isTagSubscribed(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const isTagSubscribed = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.isSubscribed(getAccessToken, cancelSource, tagModel?.getData("_id"));

    if (isMounted?.current === true && response?.data) {
      setIsSubscribed(response.data === true);
    }
  };

  const handleTagSubscription = async () => {
    setIsLoading(true);

    if (isSubscribed === true) {
      const response = await adminTagsActions.unsubscribeFromTag(getAccessToken, cancelTokenSource, tagModel?.getData("_id"));
      setIsSubscribed(response?.status !== 200);
    }
    else {
      const response = await adminTagsActions.subscribeToTag(getAccessToken, cancelTokenSource, tagModel?.getData("_id"));
      setIsSubscribed(response?.data === true);
    }

    if (isMounted?.current === true) {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionIcon
      handleSubscription={handleTagSubscription}
      isSubscribed={isSubscribed}
      showText={showText}
      isLoading={isLoading}
      className={className}
    />
  );
}

TagSubscriptionIcon.propTypes = {
  tagModel: PropTypes.object,
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default TagSubscriptionIcon;