import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faArchive} from "@fortawesome/pro-light-svg-icons";

export default function LogsSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={"/logs"}
      label={"Logs"}
      icon={faArchive}
    />
  );
}
