import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import siteNotificationActions from "./site-notification-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import SiteNotificationTable from "./SiteNotificationTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import SiteNotificationManagementSubNavigationBar
  from "components/admin/site_notifications/SiteNotificationManagementSubNavigationBar";

function SiteNotificationManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [siteNotifications, setSiteNotifications] = useState([]);
  const toastContext = useContext(DialogToastContext);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      if(isMounted?.current === true){
      setIsLoading(false);
      }
    }
  };

  const getSiteNotifications = async (cancelSource = cancelTokenSource) => {
    const response = await siteNotificationActions.getSiteNotifications(getAccessToken, cancelSource);
    if (response?.data){
      setSiteNotifications(response?.data);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
        await getSiteNotifications(cancelSource);
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
    <ScreenContainer
      breadcrumbDestination={"siteNotificationManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
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