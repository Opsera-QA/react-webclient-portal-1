import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faAnalytics} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function ReportsSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    userAccessRoles,
    isSassUser,
    isOpseraAdministrator,
    isPowerUser,
    isSiteAdministrator,
  } = useContext(AuthContext);

  if (
    userAccessRoles == null
    || (
      isSassUser() !== true
      && isOpseraAdministrator() !== true
      && isPowerUser !== true
      && isSiteAdministrator !== true
    )) {
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
