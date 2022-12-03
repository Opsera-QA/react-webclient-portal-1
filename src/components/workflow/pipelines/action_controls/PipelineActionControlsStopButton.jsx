import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import {faStopCircle} from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function PipelineActionControlsStopButton(
  {
    pipeline,
    handleStopWorkflowClick, // TODO: Move logic in here
    workflowStatus,
    pipelineIsStopping,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  if (workflowStatus !== "running") {
    return null;
  }

  return (
    <PipelineActionControlButtonBase
      icon={faStopCircle}
      normalText={"Stop"}
      busyText={"Stopping"}
      buttonState={pipelineIsStopping === true ? buttonLabelHelper.BUTTON_STATES.BUSY : undefined}
      onClickFunction={handleStopWorkflowClick}
      disabled={PipelineRoleHelper.canStopPipeline(userData, pipeline) !== true}
      variant={"danger"}
    />
  );
}

PipelineActionControlsStopButton.propTypes = {
  pipeline: PropTypes.object,
  handleStopWorkflowClick: PropTypes.func,
  workflowStatus: PropTypes.string,
  pipelineIsStopping: PropTypes.bool,
};
