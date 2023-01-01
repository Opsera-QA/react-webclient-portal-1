import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faShieldKeyhole} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function GitCustodianSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    isSassUser,
    isOpseraAdministrator,
    isSecurityManager,
    isAuditor,
    isSiteAdministrator,
  } = useComponentStateReference();

  if (
      isSassUser !== true
      && isOpseraAdministrator !== true
      && isSiteAdministrator !== true
      && isSecurityManager !== true
      && isAuditor !== true
    ) {
    return null;
  }

  return (
    <SidebarNavigationLinkBase
      link={`/git-custodian`}
      label={"Git Custodian"}
      icon={faShieldKeyhole}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

GitCustodianSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
