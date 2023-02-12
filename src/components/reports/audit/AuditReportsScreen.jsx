import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import AuditReportPageLinkCards from "components/reports/audit/AuditReportPageLinkCards";

export default function AuditReportsScreen() {
  const {
    isSiteAdministrator,
    isSaasUser,
  } = useComponentStateReference();

  if (isSiteAdministrator !== true && isSaasUser !== true) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"auditReports"} />}
      pageDescription={"View Audit reports from this dashboard."}
    >
      <AuditReportPageLinkCards />
    </ScreenContainer>
  );
}
