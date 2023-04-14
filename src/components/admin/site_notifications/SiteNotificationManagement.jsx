import React, { useState, useEffect } from "react";
import siteNotificationActions from "./site-notification-actions";
import SiteNotificationTable from "./SiteNotificationTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import SiteNotificationManagementSubNavigationBar
  from "components/admin/site_notifications/SiteNotificationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function SiteNotificationManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [siteNotifications, setSiteNotifications] = useState([]);
  const {
    getAccessToken,
    isOpseraAdministrator,
    toastContext,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setSiteNotifications([]);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getSiteNotifications();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      if(isMounted?.current === true){
      setIsLoading(false);
      }
    }
  };

  const getSiteNotifications = async () => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken, cancelTokenSource);
    if (response?.data){
      setSiteNotifications(response?.data);
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"siteNotificationManagement"}
      navigationTabContainer={<SiteNotificationManagementSubNavigationBar activeTab={"siteNotificationManager"}/>}
    >
      <SiteNotificationTable
        loadData={loadData}
        isLoading={isLoading}
        data={siteNotifications}
      />
    </ScreenContainer>
  );

}


export default SiteNotificationManagement;