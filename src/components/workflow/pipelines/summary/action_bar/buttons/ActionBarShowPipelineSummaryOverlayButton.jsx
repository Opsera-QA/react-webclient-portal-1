import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineDetailsOverviewOverlay from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";
import ActionBarViewDetailsButtonBase from "components/common/actions/buttons/ActionBarViewDetailsButtonBase";

function ActionBarShowPipelineSummaryOverlayButton({pipeline, isActionAllowedFunction}) {
  const toastContext = useContext(DialogToastContext);

  const showDetailsFunction = () => {
    toastContext.showOverlayPanel(<PipelineDetailsOverviewOverlay pipeline={pipeline} />);
  };

  if (pipeline == null || isActionAllowedFunction("view_template_pipeline_btn", pipeline?.owner) !== true) {
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
  isActionAllowedFunction: PropTypes.func
};

export default ActionBarShowPipelineSummaryOverlayButton;