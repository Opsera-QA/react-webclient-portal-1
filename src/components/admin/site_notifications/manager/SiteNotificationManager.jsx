import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import siteNotificationHelpers from "components/admin/site_notifications/site-notification-helpers";
import SiteNotificationManagerDetailPanel
  from "components/admin/site_notifications/manager/SiteNotificationManagerDetailPanel";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import axios from "axios";
import SiteNotificationManagementSubNavigationBar
  from "components/admin/site_notifications/SiteNotificationManagementSubNavigationBar";

function SiteNotificationManager() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [siteWideNotificationData, setSiteWideNotificationData] = useState(undefined);
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

  const loadData = async (cancelSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getSiteNotifications(cancelSource);
      }
    }
  };

  const getSiteNotifications = async (cancelSource) => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken, cancelSource);

    await unpackNotifications(response?.data);
  };

  const unpackNotifications = (response) => {
    let siteWideNotification = siteNotificationHelpers.parseSiteNotification(response, "site");

    if (isMounted?.current === true) {
      setSiteWideNotificationData(siteWideNotification);
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"siteNotificationManager"}
      metadata={siteNotificationMetadata}
      dataObject={siteWideNotificationData}
      accessDenied={!accessRoleData?.OpseraAdministrator}
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