import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";

export default function NotificationsSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={"/notifications"}
      label={"Notifications"}
      icon={faEnvelope}
    />
  );
}
