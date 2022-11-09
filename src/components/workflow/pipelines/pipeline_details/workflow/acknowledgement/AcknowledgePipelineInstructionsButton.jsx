import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  pipelineAcknowledgementActions
} from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/pipelineAcknowledgement.actions";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function AcknowledgePipelineInstructionsButton(
  {
    pipelineStepId,
    pipelineId,
    message,
    closePanelFunction,
    disabled,
    className,
  }) {
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const acknowledgePipelineInstructions = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await pipelineAcknowledgementActions.acknowledgePipelineInstructions(
        getAccessToken,
        cancelTokenSource,
        pipelineId,
        pipelineStepId,
        message,
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      closePanelFunction();
    } catch (error) {
      toastContext.showInlineErrorMessage(error, "Error Acknowledging Pipeline Instructions:");
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }
  };

  if (isMongoDbId(pipelineId) !== true || isMongoDbId(pipelineStepId) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"success"}
      buttonState={buttonState}
      className={className}
      onClickFunction={acknowledgePipelineInstructions}
      disabled={disabled}
      icon={faCheckCircle}
      normalText={"Acknowledge Pipeline Instructions"}
      successText={"Successfully Acknowledged Pipeline Instructions!"}
      errorText={"Failed to Acknowledge Pipeline Instructions!"}
      busyText={"Logging Acknowledgement and Resuming Pipeline"}
    />
  );
}

AcknowledgePipelineInstructionsButton.propTypes = {
  pipelineId: PropTypes.string,
  pipelineStepId: PropTypes.string,
  message: PropTypes.string,
  closePanelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};