import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TagReportPageLinkCards from "components/reports/tags/TagReportPageLinkCards";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function TagReportsScreen() {
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
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"tagReports"} />}
      breadcrumbDestination={"tagReports"}
      pageDescription={"View reports from this dashboard."}
    >
      <TagReportPageLinkCards />
    </ScreenContainer>
  );
}

export default TagReportsScreen;

