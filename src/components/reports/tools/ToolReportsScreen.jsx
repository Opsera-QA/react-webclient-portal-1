import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import ToolReportPageLinkCards from "components/reports/tools/ToolReportPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolReportsScreen() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

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
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"toolReports"} />}
      breadcrumbDestination={"toolReports"}
      pageDescription={"View reports from this dashboard."}
    >
      <ToolReportPageLinkCards />
    </ScreenContainer>
  );
}

