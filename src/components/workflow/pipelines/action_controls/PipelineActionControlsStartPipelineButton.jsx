import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function PipelineActionControlsStartPipelineButton(
  {
    pipeline,
    workflowStatus,
    pipelineIsStarting,
    disabledActionState,
    hasQueuedRequest,
    dynamicSettingsEnabled,
    handleRunPipelineClick, // TODO: Move actual start functionality in here
  }) {
  const {
    userData,
  } = useComponentStateReference();



  const handlePipelineStartClick = () => {
    if (dynamicSettingsEnabled === true) {
      handleRunPipelineClick();
    } else {
      handleRunPipelineClick();
    }
  };

  if (!!workflowStatus && workflowStatus !== "stopped") {
    return null;
  }

  // TODO: Add logic for branch switch
  return (
    <PipelineActionControlButtonBase
      icon={faPlay}
      normalText={"Start Pipeline"}
      busyText={"Starting"}
      buttonState={pipelineIsStarting === true ? buttonLabelHelper.BUTTON_STATES.BUSY : undefined}
      onClickFunction={handlePipelineStartClick}
      disabled={PipelineRoleHelper.canStartPipeline(userData, pipeline) !== true || disabledActionState || pipelineIsStarting || hasQueuedRequest}
      variant={"success"}
    />
  );
}

PipelineActionControlsStartPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  handleRunPipelineClick: PropTypes.func,
  workflowStatus: PropTypes.string,
  pipelineIsStarting: PropTypes.any,
  disabledActionState: PropTypes.any,
  hasQueuedRequest: PropTypes.any,
  dynamicSettingsEnabled: PropTypes.bool,
};
