import React, {useContext, useEffect, useState} from "react";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import {AuthContext} from "contexts/AuthContext";
import siteNotificationHelpers from "components/admin/site_notifications/site-notification-helpers";
import { useLocation, matchPath } from 'react-router-dom';
import SiteNotificationBanner from "components/admin/site_notifications/displayer/SiteNotificationBanner";

function SiteNotificationDisplayer() {
  const location = useLocation();
  const { getAccessToken } = useContext(AuthContext);
  const [siteWideNotification, setSiteWideNotification] = useState(undefined);
  const [pipelinesNotification, setPipelinesNotification] = useState(undefined);

  useEffect(() => {
    loadSiteNotifications();
  }, []);

  const loadSiteNotifications = async () => {
    try {
      const response = await siteNotificationActions.getSiteNotifications(getAccessToken);
      unpackNotifications(response?.data);
    }
    catch (error) {
      console.error("Could not pull site notifications: " + error)
    }
  }

  const unpackNotifications = (response) => {
    setSiteWideNotification(siteNotificationHelpers.getExistingSiteNotification(response, "site"));
    // setPipelinesNotification(siteNotificationHelpers.getExistingSiteNotification(response, "pipelines"));
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