import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolCountTable from "components/reports/tools/counts/ToolCountTable";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolCountsReport() {
  const [toolCounts, setToolCounts] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
    getAccessToken,
    toastContext,
    accessRoleData,
  } = useComponentStateReference();

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
    const toolCountResponse = await toolsActions.getToolCounts(getAccessToken);

    if (toolCountResponse?.data) {
      setToolCounts(toolCountResponse.data);
    }
  };

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"toolCountsReport"}
      pageDescription={"View Tool usage counts"}
      isLoading={!accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReportViewer"} />}
    >
      <ToolCountTable isLoading={isLoading} data={toolCounts} loadData={loadData} />
    </ScreenContainer>
  );
}

export default ToolCountsReport;

