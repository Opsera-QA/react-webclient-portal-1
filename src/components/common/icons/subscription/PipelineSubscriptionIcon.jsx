import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SubscriptionIcon from "components/common/icons/subscription/SubscriptionIcon";
import pipelineActions from "components/workflow/pipeline-actions";

function PipelineSubscriptionIcon({ pipelineModel, showText, className }) {
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true)
      await isPipelineSubscribed(cancelSource);
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

  const isPipelineSubscribed = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.isSubscribed(getAccessToken, cancelSource, pipelineModel?.getData("_id"));

    if (isMounted?.current === true && response?.data) {
      setIsSubscribed(response.data === true);
    }
  };

  const handleTagSubscription = async () => {
    if (isSubscribed === true) {
      const response = await pipelineActions.unsubscribeFromPipeline(getAccessToken, cancelTokenSource, pipelineModel?.getData("_id"));
      setIsSubscribed(response?.status !== 200);
    }
    else {
      const response = await pipelineActions.subscribeToPipeline(getAccessToken, cancelTokenSource, pipelineModel?.getData("_id"));
      setIsSubscribed(response?.data === true);
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

PipelineSubscriptionIcon.propTypes = {
  pipelineModel: PropTypes.object,
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default PipelineSubscriptionIcon;