import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";
import {pipelineValidationHelper} from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import PipelineActionRuntimeSettingsSelectionOverlay
  from "components/workflow/pipelines/action_controls/start/PipelineActionRuntimeSettingsSelectionOverlay";

export default function PipelineActionControlsStartPipelineButton(
  {
    pipeline,
    workflowStatus,
    pipelineIsStarting,
    disabledActionState,
    hasQueuedRequest,
    dynamicSettingsEnabled,
    pipelineOrientation,
    handleRunPipelineClick, // TODO: Move actual start functionality in here
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const handlePipelineStartClick = () => {
    // TODO: Allow middle of the pipeline to configure if they start over
    if (dynamicSettingsEnabled === true && pipelineOrientation === "start" && pipelineValidationHelper.isPipelineSourceRepositoryValidForDynamicSettings(pipeline) === true) {
      toastContext.showOverlayPanel(
        <PipelineActionRuntimeSettingsSelectionOverlay
          pipeline={pipeline}
          handleRunPipelineFunction={handleRunPipelineClick}
        />
      );
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
  pipelineOrientation: PropTypes.string,
};
