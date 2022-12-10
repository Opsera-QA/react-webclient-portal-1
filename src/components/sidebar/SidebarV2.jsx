import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  faClipboardList,
  faArchive,
  faHome,
  faTools,
  faDraftingCompass,
  faLayerGroup,
  faCogs,
  faChartNetwork,
  faAnalytics,
  faEnvelope,
  faTasks,
} from "@fortawesome/pro-light-svg-icons";
import "css/general/sidebar.css";
import IconBase from "components/common/icons/IconBase";
import ToolchainSidebarNavigationLink from "components/sidebar/links/ToolchainSidebarNavigationLink";
import PipelinesSidebarNavigationLink from "components/sidebar/links/PipelinesSidebarNavigationLink";
import InsightsSidebarNavigationLink from "components/sidebar/links/InsightsSidebarNavigationLink";
import HomeSidebarNavigationLink from "components/sidebar/links/HomeSidebarNavigationLink";
import AdminToolsSidebarNavigationLink from "components/sidebar/links/AdminToolsSidebarNavigationLink";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolRegistrySidebarNavigationLink from "components/sidebar/links/ToolRegistrySidebarNavigationLink";
import SettingsSidebarNavigationLink from "components/sidebar/links/SettingsSidebarNavigationLink";
import ReportsSidebarNavigationLink from "components/sidebar/links/ReportsSidebarNavigationLink";
import NotificationsSidebarNavigationLink from "components/sidebar/links/NotificationsSidebarNavigationLink";
import BlueprintsSidebarNavigationLink from "components/sidebar/links/BlueprintsSidebarNavigationLink";
import LogsSidebarNavigationLink from "components/sidebar/links/LogsSidebarNavigationLink";
import TasksSidebarNavigationLink from "components/sidebar/links/TasksSidebarNavigationLink";

export default function Sidebar({ hideSideBar }) {
  const { userData } = useComponentStateReference();
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  if (userData == null || hideSideBar === true) {
    return null;
  }

  return (
    <div
      className={isSidebarOpened === true ? "w-20 pt-1 d-block is-opened" : "w-20 pt-1 d-block"}
      onMouseEnter={() => setIsSidebarOpened(true)}
      onMouseLeave={() => setIsSidebarOpened(false)}
    >
      <div className="sidebar-container sticky-top">
        <div className="sidebar-menu pt-3">
          <HomeSidebarNavigationLink />

          <div className="mt-3 mb-2 sub-header">Products</div>
          <ToolchainSidebarNavigationLink />
          <PipelinesSidebarNavigationLink />
          <InsightsSidebarNavigationLink />

          <div className="mt-3 mb-2 sub-header">Operations</div>
          <ToolRegistrySidebarNavigationLink />
          <TasksSidebarNavigationLink />
          <LogsSidebarNavigationLink />
          <BlueprintsSidebarNavigationLink />
          <ReportsSidebarNavigationLink />
          <NotificationsSidebarNavigationLink />
          <SettingsSidebarNavigationLink />
          <AdminToolsSidebarNavigationLink />
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};
