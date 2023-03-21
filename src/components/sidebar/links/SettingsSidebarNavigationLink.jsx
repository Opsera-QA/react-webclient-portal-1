import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {breadcrumbs} from "components/common/navigation/trails";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";

export default function SettingsSidebarNavigationLink({ isSidebarCollapsed, }) {
  const {
    userData,
  } = useContext(AuthContext);
  const breadcrumb = breadcrumbs.accountSettings;

  if (breadcrumb == null || RoleHelper.doesUserMeetSiteRoleRequirements(userData, breadcrumb?.allowedRoles) !== true) {
    return null;
  }

  return (
    <SidebarNavigationLinkBase
      link={`/settings`}
      label={"Settings"}
      icon={faCogs}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

SettingsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
