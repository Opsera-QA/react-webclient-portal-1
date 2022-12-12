import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faLayerGroup} from "@fortawesome/pro-light-svg-icons";

export default function BlueprintsSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={"/blueprint"}
      label={"Blueprints"}
      icon={faLayerGroup}
    />
  );
}
