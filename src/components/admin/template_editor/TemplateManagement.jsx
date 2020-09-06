import React, { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "contexts/AuthContext";

import TemplatesTable from "./TemplateTable";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import templateActions from "./template-actions";
import {getLoadingErrorDialog} from "../../common/toasts/toasts";

function TemplateManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getRoles();
    await getTemplates();
    setIsLoading(false);
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getTemplates = async () => {
    try {
      const templateListResponse = await templateActions.getTemplates(getAccessToken);
      console.log(templateListResponse.data);
      setTemplateList(templateListResponse.data);
    } catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }
  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }
  return (
    <div>
      <BreadcrumbTrail destination={"templateManagement"}/>
      {showToast && toast}
      <TemplatesTable data={templateList} isLoading={isLoading} loadData={loadData}/>
    </div>
  );
}

export default TemplateManagement;