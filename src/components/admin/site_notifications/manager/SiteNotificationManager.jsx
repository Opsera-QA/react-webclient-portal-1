import React, {useState, useEffect} from "react";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import siteNotificationHelpers from "components/admin/site_notifications/site-notification-helpers";
import SiteNotificationManagerDetailPanel
  from "components/admin/site_notifications/manager/SiteNotificationManagerDetailPanel";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import SiteNotificationManagementSubNavigationBar
  from "components/admin/site_notifications/SiteNotificationManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function SiteNotificationManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [siteWideNotificationData, setSiteWideNotificationData] = useState(undefined);
  const {
    getAccessToken,
    isOpseraAdministrator,
    toastContext,
    isMounted,
    cancelTokenSource,
    accessRoleData,
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
      setIsLoading(true);
      await getSiteNotifications();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSiteNotifications = async () => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken, cancelTokenSource);

    const siteWideNotification = siteNotificationHelpers.parseSiteNotification(response?.data, "site");

    if (isMounted?.current === true) {
      setSiteWideNotificationData(siteWideNotification);
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationManager"}
      metadata={siteNotificationMetadata}
      dataObject={siteWideNotificationData}
      isLoading={isLoading}
      navigationTabContainer={
        <SiteNotificationManagementSubNavigationBar
          activeTab={"siteNotificationManager"}
        />
      }
      detailPanel={
        <SiteNotificationManagerDetailPanel
          siteWideNotificationData={siteWideNotificationData}
          setSiteWideNotificationData={setSiteWideNotificationData}
        />
      }
    />
  );
}

export default SiteNotificationManager;