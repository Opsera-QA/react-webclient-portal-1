import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import PropTypes from "prop-types";

export default function PipelinesSidebarNavigationLink({ isSidebarCollapsed, }) {
  return (
    <SidebarNavigationLinkBase
      link={pipelineHelper.getManagementScreenLink()}
      label={"Pipelines"}
      icon={faDraftingCompass}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}

PipelinesSidebarNavigationLink.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
