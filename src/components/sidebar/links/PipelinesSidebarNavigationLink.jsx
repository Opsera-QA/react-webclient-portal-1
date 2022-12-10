import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelinesSidebarNavigationLink() {
  return (
    <SidebarNavigationLinkBase
      link={pipelineHelper.getManagementScreenLink()}
      label={"Pipelines"}
      icon={faDraftingCompass}
    />
  );
}
