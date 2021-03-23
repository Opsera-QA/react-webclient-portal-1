import React, {useContext, useEffect, useRef, useState} from "react";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import {AuthContext} from "contexts/AuthContext";
import siteNotificationHelpers from "components/admin/site_notifications/site-notification-helpers";
import { useLocation, matchPath } from 'react-router-dom';
import SiteNotificationBanner from "components/admin/site_notifications/displayer/SiteNotificationBanner";
import axios from "axios";

function SiteNotificationDisplayer() {
  const location = useLocation();
  const { getAccessToken, getIsAuthenticated } = useContext(AuthContext);
  const [siteWideNotification, setSiteWideNotification] = useState(undefined);
  const [pipelinesNotification, setPipelinesNotification] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  // TODO: Should we update when changing route?
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

  const loadData = async (cancelSource) => {
    try {
      const isAuthenticated = await getIsAuthenticated();

      if (isMounted?.current === true && isAuthenticated) {
        const response = await siteNotificationActions.getSiteNotifications(getAccessToken, cancelSource);
        unpackNotifications(response?.data);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error("Could not pull site notifications: " + error);
      }
    }
  };

  const unpackNotifications = (response) => {
    if (isMounted?.current === true) {
      setSiteWideNotification(siteNotificationHelpers.getExistingSiteNotification(response, "site"));
      // setPipelinesNotification(siteNotificationHelpers.getExistingSiteNotification(response, "pipelines"));
    }
  };

  const isNotificationValid = (notification) => {
    const currentDate = new Date();
    const displayOnDate = new Date(notification.getData("displayOnDate"));
    const expiration = new Date(notification.getData("expiration"));
    return notification.getData("active") === true && displayOnDate < currentDate && expiration > currentDate;
  };

  const getSiteWideNotification = () => {
    if (siteWideNotification != null && isNotificationValid(siteWideNotification)) {
      return (
        <SiteNotificationBanner siteNotification={siteWideNotification} />
      );
    }
  };

  const getPipelinesNotification = () => {
    const match = matchPath(location.pathname, {path: "/workflow/", exact: false, strict: false});
    if (match != null && siteWideNotification != null && isNotificationValid(siteWideNotification)) {
      return (
        <SiteNotificationBanner siteNotification={siteWideNotification} />
      );
    }
  };

  return (
    <div>
      {getSiteWideNotification()}
      {/*{getPipelinesNotification()}*/}
    </div>
  );
}

SiteNotificationDisplayer.propTypes = {
};

export default SiteNotificationDisplayer;