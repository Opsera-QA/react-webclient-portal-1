import React from "react";
import PropTypes from "prop-types";
import PipelineDetailsOverviewOverlay from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";
import ActionBarViewDetailsButtonBase from "components/common/actions/buttons/ActionBarViewDetailsButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ActionBarShowPipelineSummaryOverlayButton({pipeline, isActionAllowedFunction}) {
  const {
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const showDetailsFunction = () => {
    toastContext.showOverlayPanel(<PipelineDetailsOverviewOverlay pipeline={pipeline} />);
  };

  if (pipeline == null || isActionAllowedFunction("view_template_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  if (isOpseraAdministrator !== true) {
    return null;
    // return (
    //   <ActionBarViewDetailsButtonBase
    //     className={"ml-3"}
    //     tooltipText={"Viewing Pipeline configuration details is available in the full Opsera Offering."}
    //     disabled={true}
    //   />
    // );
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