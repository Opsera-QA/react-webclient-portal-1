import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SubscriptionIcon from "components/common/icons/subscription/SubscriptionIcon";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import { pipelineSubscriptionActions } from "components/workflow/pipelines/subscriptions/pipelineSubscription.actions";
import { DialogToastContext } from "contexts/DialogToastContext";

function PipelineSubscriptionIcon(
  {
    pipelineModel,
    pipelineId,
    showText,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, featureFlagHideItemInProd } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isUpdatingSubscriptionStatus, setIsUpdatingSubscriptionStatus] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setIsSubscribed(false);

    if (featureFlagHideItemInProd() === false && isMongoDbId(pipelineId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await isPipelineSubscribed(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "Could not find subscription status:");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const isPipelineSubscribed = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineSubscriptionActions.isSubscribed(
      getAccessToken,
      cancelSource,
      pipelineId,
    );

    if (isMounted?.current === true && response?.data) {
      setIsSubscribed(response.data === true);
    }
  };

  const handleSubscriptionFunction = async () => {
    try {
      setIsUpdatingSubscriptionStatus(true);
      if (isSubscribed === true) {
        const response = await pipelineSubscriptionActions.unsubscribeFromPipeline(
          getAccessToken,
          cancelTokenSource,
          pipelineId,
        );

        if (response?.data === false) {
          setIsSubscribed(false);
          toastContext.showSystemSuccessToast(`You have successfully unsubscribed from ${pipelineModel?.getData("name")}`);
        }
      } else {
        const response = await pipelineSubscriptionActions.subscribeToPipeline(
          getAccessToken,
          cancelTokenSource,
          pipelineId,
        );

        if (response?.data === true) {
          setIsSubscribed(true);
          toastContext.showSystemSuccessToast(`You have successfully subscribed to ${pipelineModel?.getData("name")}`);
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "Could not update subscription status:");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsUpdatingSubscriptionStatus(false);
      }
    }
  };

  if (featureFlagHideItemInProd()) {
    return null;
  }

  return (
    <SubscriptionIcon
      handleSubscription={handleSubscriptionFunction}
      isSubscribed={isSubscribed}
      showText={showText}
      isLoading={isLoading || isUpdatingSubscriptionStatus}
      className={className}
    />
  );
}

PipelineSubscriptionIcon.propTypes = {
  pipelineModel: PropTypes.object,
  pipelineId: PropTypes.string,
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default PipelineSubscriptionIcon;