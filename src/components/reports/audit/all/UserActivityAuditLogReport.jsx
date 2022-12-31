import React, { useState, useEffect } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserActivityAuditLogReport() {
  const [userActivityAuditLogFilterModel, setUserActivityAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel());
  const [isLoading, setIsLoading] = useState(true);
  const {
    isSiteAdministrator,
  } = useComponentStateReference();

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"userActivityAuditLogReport"}
      isLoading={isLoading}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"auditReportViewer"} />}
      pageDescription={"View Audit Logs"}
    >
    </ScreenContainer>
  );
}
