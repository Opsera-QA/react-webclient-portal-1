import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import { faBox } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function ToolchainSidebarNavigationLink({ isSidebarCollapsed, }) {
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
      link={`/platform`}
      label={"Toolchain"}
      icon={faBox}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

ToolchainSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
