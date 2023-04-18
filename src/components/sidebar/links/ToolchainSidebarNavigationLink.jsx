import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import { faBox } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolchainSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    isSaasUser,
    isOpseraAdministrator,
    isPowerUser,
    isSiteAdministrator,
  } = useComponentStateReference();

  if (
    isSaasUser !== true
      && isOpseraAdministrator !== true
      && isPowerUser !== true
      && isSiteAdministrator !== true
    ) {
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
