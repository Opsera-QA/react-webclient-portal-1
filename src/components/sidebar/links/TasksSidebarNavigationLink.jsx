import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import {taskHelper} from "components/tasks/task.helper";

export default function TasksSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={taskHelper.getManagementScreenLink()}
      label={"Tasks"}
      icon={faTasks}
    />
  );
}
