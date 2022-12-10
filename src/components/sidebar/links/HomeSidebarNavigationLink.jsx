import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faHome} from "@fortawesome/pro-light-svg-icons";

export default function HomeSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={"/"}
      label={"Home"}
      icon={faHome}
    />
  );
}
