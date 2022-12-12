import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import {taskHelper} from "components/tasks/task.helper";
import PropTypes from "prop-types";

export default function TasksSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={taskHelper.getManagementScreenLink()}
      label={"Tasks"}
      icon={faTasks}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

TasksSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
