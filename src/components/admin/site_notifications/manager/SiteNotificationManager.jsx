import React, { useState, useEffect, useContext } from "react";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import LoadingDialog from "components/common/status_notifications/loading";
import siteNotificationHelpers from "components/admin/site_notifications/site-notification-helpers";
import SiteNotificationManagerDetailPanel
  from "components/admin/site_notifications/manager/SiteNotificationManagerDetailPanel";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotificationMetadata";

function SiteNotificationManager() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [siteWideNotificationData, setSiteWideNotificationData] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getSiteNotifications();
      }
    }
  };

  const getSiteNotifications = async () => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken);

    await unpackNotifications(response?.data);
  };

  const unpackNotifications = (response) => {
    let siteWideNotification = siteNotificationHelpers.parseSiteNotification(response, "site");
    setSiteWideNotificationData(siteWideNotification);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationManager"}
      metadata={siteNotificationMetadata}
      dataObject={siteWideNotificationData}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      isLoading={isLoading}
      detailPanel={<SiteNotificationManagerDetailPanel siteWideNotificationData={siteWideNotificationData} setSiteWideNotificationData={setSiteWideNotificationData} />}
    />
  );
}

export default SiteNotificationManager;