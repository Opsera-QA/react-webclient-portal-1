import React, { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "contexts/AuthContext";

import TemplatesTable from "./TemplateTable";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import templateActions from "./template-actions";
import {DialogToastContext} from "../../../contexts/DialogToastContext";

function TemplateManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
      await getTemplates();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getTemplates = async () => {
    const templateListResponse = await templateActions.getTemplates(getAccessToken);
    setTemplateList(templateListResponse.data);
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
      <TemplatesTable data={templateList} isLoading={isLoading} loadData={loadData}/>
    </div>
  );
}

export default TemplateManagement;