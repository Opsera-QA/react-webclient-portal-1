import React from "react";
import PropTypes from "prop-types";
import PipelineDetailsOverviewOverlay from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";
import ActionBarViewDetailsButtonBase from "components/common/actions/buttons/ActionBarViewDetailsButtonBase";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarShowPipelineSummaryOverlayButton({pipeline}) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const showDetailsFunction = () => {
    toastContext.showOverlayPanel(<PipelineDetailsOverviewOverlay pipeline={pipeline} />);
  };

  if (pipeline == null || PipelineRoleHelper.canViewPipelineTemplate(userData, pipeline) !== true) {
    return null;
  }

  return (
    <ActionBarViewDetailsButtonBase
      className={"ml-3"}
      showDetailsFunction={showDetailsFunction}
      tooltipText={"View Pipeline Configuration Details"}
    />
  );
}

ActionBarShowPipelineSummaryOverlayButton.propTypes = {
  pipeline: PropTypes.object,
};

export default ActionBarShowPipelineSummaryOverlayButton;