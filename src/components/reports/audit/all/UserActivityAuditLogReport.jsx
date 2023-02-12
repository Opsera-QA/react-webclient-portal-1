import React, { useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import ReportsHelpDocumentation from "components/common/help/documentation/reports/ReportsHelpDocumentation";

export default function UserActivityAuditLogReport() {
  const [userActivityAuditLogFilterModel, setUserActivityAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel());
  const {
    accessRoleData,
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  const getHelpComponent = () => {
    return (<ReportsHelpDocumentation/>);
  };

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"userActivityAuditLogReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"auditReportViewer"} />}
      pageDescription={"View Audit Logs"}
    >
    </ScreenContainer>
  );
}
