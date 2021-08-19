import React, { useContext, useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolCountTable from "components/reports/tools/counts/ToolCountTable";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

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
      setIsLoading(false);
    }
  };

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

  return (
    <ScreenContainer
      breadcrumbDestination={"toolCountsReport"}
      pageDescription={"View Tool usage counts"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReportViewer"} />}
    >
      <ToolCountTable isLoading={isLoading} data={toolCounts} loadData={loadData} />
    </ScreenContainer>
  );
}

export default ToolCountsReport;

