import React, { useContext, useState, useEffect } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolCountTable from "components/reports/tools/counts/ToolCountTable";

function ToolCountsReport() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [toolCounts, setToolCounts] = useState(undefined);
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
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      const toolCountResponse = await toolsActions.getToolCounts(getAccessToken);

      if (toolCountResponse?.data) {
        setToolCounts(toolCountResponse.data);
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
    <ScreenContainer
      breadcrumbDestination={"toolCountsReport"}
      pageDescription={"View tool usage counts"}
      isLoading={isLoading}
    >
      <ToolCountTable isLoading={isLoading} data={toolCounts} />
    </ScreenContainer>
  );
}

export default ToolCountsReport;

