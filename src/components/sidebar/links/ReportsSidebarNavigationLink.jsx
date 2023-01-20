import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faAnalytics} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ReportsSidebarNavigationLink({isSidebarCollapsed,}) {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isSaasUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isSaasUser !== true
    && isOpseraAdministrator !== true
    && isPowerUser !== true
    && isSiteAdministrator !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <SidebarNavigationLinkBase
      link={`/reports`}
      label={"Reports"}
      icon={faAnalytics}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

ReportsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
