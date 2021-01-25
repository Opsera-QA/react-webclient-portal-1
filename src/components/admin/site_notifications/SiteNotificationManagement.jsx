import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

import siteNotificationActions from "./site-notification-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import SiteNotificationTable from "./SiteNotificationTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import TableScreenContainer from "components/common/panels/table_screen_container/TableScreenContainer";

function SiteNotificationManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [siteNotifications, setSiteNotifications] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSiteNotifications = async () => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken);
    setSiteNotifications(response?.data);
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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <TableScreenContainer
      breadcrumbDestination={"siteNotificationManagement"}
      title={"Site Notification Management"}
      tableComponent={<SiteNotificationTable loadData={loadData} isLoading={isLoading} data={siteNotifications} />}
    />
  );

}


export default SiteNotificationManagement;