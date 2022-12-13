import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faLayerGroup} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function BlueprintsSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={"/blueprint"}
      label={"Blueprints"}
      icon={faLayerGroup}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

BlueprintsSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};