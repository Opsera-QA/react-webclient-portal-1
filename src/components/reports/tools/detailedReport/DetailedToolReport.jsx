import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import DetailedToolReportTable from "components/reports/tools/detailedReport/DetailedToolReportTable";
import WideScreenContainer from "components/common/panels/general/WideScreenContainer";
import {useHistory} from "react-router-dom";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";


function DetailedToolReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [fullToolRegistryList, setFullToolRegistryList] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
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
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      const toolResponse = await toolsActions.getFullRoleLimitedToolRegistryList(getAccessToken);
      const tools = toolResponse?.data?.data;

      if (Array.isArray(tools) && tools.length > 0) {
        setFullToolRegistryList(tools);
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <WideScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"detailedToolReport"}
      pageDescription={"View a detailed report of all tools used"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReportViewer"} />}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator}
    >
      <DetailedToolReportTable isLoading={isLoading} data={fullToolRegistryList} />
    </WideScreenContainer>
  );
}

export default DetailedToolReport;

