import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";

function ToolReports() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolReports"}
      pageDescription={"You will be able to view Tool Reports here."}
      isLoading={isLoading}
    >
      <BreadcrumbPageLink breadcrumbDestination={"toolsUsedInPipelineReport"} />
    </ScreenContainer>
  );
}

export default ToolReports;

