import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function InsightsSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={"/insights"}
      label={"Insights"}
      icon={faChartNetwork}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

InsightsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};