import React, { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "contexts/AuthContext";

import TemplatesTable from "./TemplateTable";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import templateActions from "./template-actions";

function TemplateManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setPageLoading(true);
    await getRoles();
    await getTemplates();
    setPageLoading(false);
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
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  } else {
    return (
      <div>
        <BreadcrumbTrail destination={"templateManagement"}/>
        <TemplatesTable data={templateList} loadData={loadData}/>
      </div>
    );
  }
}

export default TemplateManagement;