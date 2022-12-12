import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faCogs} from "@fortawesome/pro-light-svg-icons";

export default function SettingsSidebarNavigationLink() {
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
      link={`/settings`}
      label={"Settings"}
      icon={faCogs}
    />
  );
}
