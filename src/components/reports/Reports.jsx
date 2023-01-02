import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import ReportsHelpDocumentation from "../common/help/documentation/reports/ReportsHelpDocumentation";
import ReportsPageLinkCards from "./ReportsPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function Reports() {
  const {
    accessRoleData,
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
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
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"all"} />}
      breadcrumbDestination={"reports"}
      pageDescription={"View all Tag, Tool, and User reports from this dashboard."}
      helpComponent={getHelpComponent()}
    >
      <ReportsPageLinkCards />
    </ScreenContainer>
  );
}
