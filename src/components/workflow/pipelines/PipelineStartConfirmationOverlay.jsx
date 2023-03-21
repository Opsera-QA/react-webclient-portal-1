import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faArrowRight, faPlay, faWandMagic} from "@fortawesome/pro-light-svg-icons";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import {pipelineValidationHelper} from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import PipelineActionRuntimeSettingsSelectionOverlay
  from "components/workflow/pipelines/action_controls/start/PipelineActionRuntimeSettingsSelectionOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {BUTTON_STATES} from "hooks/general/buttons/useButtonState";

export default function PipelineStartConfirmationOverlay(
  {
    pipeline,
    handlePipelineStartRequest,
    handlePipelineResumeRequest,
    dynamicSettingsEnabled,
  }) {
  const [startingPipeline, setStartingPipeline] = useState(false);
  const [resumingPipeline, setResumingPipeline] = useState(false);
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    setResumingPipeline(false);
    setStartingPipeline(false);
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"pb-3 px-3"}>
        <VanityButtonBase
          variant={"success"}
          className={"mr-2"}
          buttonSize={"sm"}
          icon={faPlay}
          normalText={"Start Pipeline From Beginning"}
          busyText={"Starting Pipeline From Beginning"}
          buttonState={startingPipeline === true ? BUTTON_STATES.BUSY : BUTTON_STATES.READY}
          disabled={startingPipeline || resumingPipeline}
          onClickFunction={startPipelineFunction}
        />
        <VanityButtonBase
          variant={"primary"}
          buttonSize={"sm"}
          icon={faArrowRight}
          normalText={"Resume Existing Pipeline Run"}
          busyText={"Resuming Existing Pipeline Run"}
          disabled={startingPipeline || resumingPipeline}
          buttonState={resumingPipeline === true ? BUTTON_STATES.BUSY : BUTTON_STATES.READY}
          onClickFunction={resumePipelineFunction}
        />
      </ButtonContainerBase>
    );
  };

  const startPipelineFunction = async () => {
    if (
      dynamicSettingsEnabled === true
      && pipelineValidationHelper.isPipelineSourceRepositoryValidForDynamicSettings(pipeline) === true
      && PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) === true
    ) {
      toastContext.showOverlayPanel(
        <PipelineActionRuntimeSettingsSelectionOverlay
          pipeline={pipeline}
          handleRunPipelineFunction={handlePipelineStartRequest}
        />
      );
    } else {
      setStartingPipeline(true);
      await handlePipelineStartRequest();
      toastContext.clearOverlayPanel();
    }
  };

  const resumePipelineFunction = async () => {
    setResumingPipeline(true);
    await handlePipelineResumeRequest();
    toastContext.clearOverlayPanel();
  };


  return (
    <ConfirmationOverlay
      closePanel={closePanel}
      titleText={`Pipeline Start Wizard`}
      titleIcon={faWandMagic}
      showCloseButton={false}
      height={"200px"}
      buttonContainer={getButtonContainer()}
    >
      <div className={"mx-3 mb-3 mt-2"}>
        <div className="mb-2">The requested pipeline stopped before it reached the end of its run. This
          may have happened due to a failed step or other error. Please review the pipeline logs if necessary.
          Would you like to restart this pipeline from the beginning
          or attempt to resume from the last stopped step?
        </div>
      </div>
    </ConfirmationOverlay>
  );

}

PipelineStartConfirmationOverlay.propTypes = {
  pipeline: PropTypes.object,
  handlePipelineResumeRequest: PropTypes.func,
  handlePipelineStartRequest: PropTypes.func,
  dynamicSettingsEnabled: PropTypes.bool,
};
