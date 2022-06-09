import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import { faBox } from "@fortawesome/pro-light-svg-icons";

function ToolchainSidebarNavigationLink() {
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
    />
  );
}

ToolchainSidebarNavigationLink.propTypes = {};

export default ToolchainSidebarNavigationLink;
