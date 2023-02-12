import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import UserReportPageLinkCards from "components/reports/users/UserReportPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserReportsScreen() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReports"} />}
      breadcrumbDestination={"userReports"}
      pageDescription={"View reports from this dashboard."}
    >
      <UserReportPageLinkCards />
    </ScreenContainer>
  );
}

