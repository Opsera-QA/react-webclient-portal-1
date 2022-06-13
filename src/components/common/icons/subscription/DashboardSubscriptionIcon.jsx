import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import SubscriptionIcon from "components/common/icons/subscription/SubscriptionIcon";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  dashboardSubscriptionActions
} from "components/insights/dashboards/subscriptions/dashboardSubscription.actions";

function DashboardSubscriptionIcon(
  {
    dashboardModel,
    dashboardId,
    pullSubscriptionStatus,
    subscribedDashboardIds,
    showText,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
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

    if (pullSubscriptionStatus !== false && isMongoDbId(dashboardId) === true) {
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

  useEffect(() => {
    setIsSubscribed(false);
    if (Array.isArray(subscribedDashboardIds) && isMongoDbId(dashboardId) === true) {
      setIsSubscribed(subscribedDashboardIds.includes(dashboardId));
    }
  }, [subscribedDashboardIds]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await isDashboardSubscribed(cancelSource);
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

  const isDashboardSubscribed = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardSubscriptionActions.isSubscribed(
      getAccessToken,
      cancelSource,
      dashboardId,
    );

    console.log("response: " + JSON.stringify(response));

    if (isMounted?.current === true && response?.data) {
      setIsSubscribed(response.data === true);
    }
  };

  const handleSubscriptionFunction = async () => {
    try {
      setIsUpdatingSubscriptionStatus(true);
      if (isSubscribed === true) {
        const response = await dashboardSubscriptionActions.unsubscribeFromDashboard(
          getAccessToken,
          cancelTokenSource,
          dashboardId,
        );

        if (isMounted?.current === true && response?.status === 200) {
          setIsSubscribed(false);
          toastContext.showSystemSuccessToast(`You have successfully unsubscribed from ${dashboardModel?.getData("name")}`);
        }
      } else {
        const response = await dashboardSubscriptionActions.subscribeToDashboard(
          getAccessToken,
          cancelTokenSource,
          dashboardId,
        );

        if (isMounted?.current === true && response?.status === 200) {
          setIsSubscribed(true);
          toastContext.showSystemSuccessToast(`You have successfully subscribed to ${dashboardModel?.getData("name")}`);
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

DashboardSubscriptionIcon.propTypes = {
  dashboardModel: PropTypes.object,
  dashboardId: PropTypes.string,
  showText: PropTypes.bool,
  className: PropTypes.string,
  pullSubscriptionStatus: PropTypes.bool,
  subscribedDashboardIds: PropTypes.array,
};

export default DashboardSubscriptionIcon;