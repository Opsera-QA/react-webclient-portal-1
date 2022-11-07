import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  pipelineAcknowledgementActions
} from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/pipelineAcknowledgement.actions";
import { faXmarkCircle } from "@fortawesome/pro-light-svg-icons";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function RefusePipelineInstructionsAcknowledgementButton(
  {
    pipelineStepId,
    pipelineId,
    message,
    className,
    closePanelFunction,
    disabled,
  }) {
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const refusePipelineInstructionsAcknowledgement = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await pipelineAcknowledgementActions.refusePipelineInstructionsAcknowledgement(
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
      className={className}
      variant={"danger"}
      buttonState={buttonState}
      onClickFunction={refusePipelineInstructionsAcknowledgement}
      icon={faXmarkCircle}
      normalText={"Refuse Pipeline Instructions"}
      successText={"Successfully Refused Pipeline Instructions!"}
      errorText={"Failed to Refuse Pipeline Instructions!"}
      busyText={"Sending Pipeline Instructions Refusal"}
      disabled={disabled}
    />
  );
}

RefusePipelineInstructionsAcknowledgementButton.propTypes = {
  pipelineId: PropTypes.string,
  pipelineStepId: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
  closePanelFunction: PropTypes.func,
  disabled: PropTypes.bool,
};