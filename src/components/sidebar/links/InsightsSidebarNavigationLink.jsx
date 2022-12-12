import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";

export default function InsightsSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={"/insights"}
      label={"Insights"}
      icon={faChartNetwork}
    />
  );
}
