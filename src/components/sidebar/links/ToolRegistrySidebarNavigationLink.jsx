import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {toolHelper} from "components/inventory/tools/tool.helper";

export default function ToolRegistrySidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={toolHelper.getManagementScreenLink()}
      label={"Tool Registry"}
      icon={faClipboardList}
    />
  );
}
