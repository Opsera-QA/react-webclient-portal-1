import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useButtonState from "hooks/general/buttons/useButtonState";

export default function PipelineStepTagWarningSkipButton(
  {
    stepConfigurationModel,
    setStepConfigurationModel,
    savePipelineStepConfiguration,
    className,
    disabled,
    setBusy,
  }) {
  const {
    buttonState,
    buttonStateFunctions,
  }= useButtonState();
  const { toastContext, } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.clearOverlayPanel();
  };

  const saveWithoutTag = async () => {
    try {
      setBusy(true);
      buttonStateFunctions.setBusyState();
      setStepConfigurationModel({...stepConfigurationModel});
      await savePipelineStepConfiguration(stepConfigurationModel);
      buttonStateFunctions.setSuccessState();
      toastContext.showSystemSuccessToast("Pipeline Step configuration successfully saved!");
      closeOverlayFunction();
    } catch (error) {
      toastContext.showSystemErrorToast(error, "Error saving Pipeline Step configuration:");
      buttonStateFunctions.setErrorState();
    } finally {
      setBusy(false);
    }
  };

  return (
    <VanityButtonBase
      normalText={"Skip"}
      busyText={"Saving Step Configuration"}
      errorText={"Error Saving Step Configuration"}
      successText={"Successfully Saved Step Configuration"}
      className={className}
      disabled={disabled}
      buttonState={buttonState}
      onClickFunction={saveWithoutTag}
      variant={"outline-warning"}
      icon={faTriangleExclamation}
    />
  );
}

PipelineStepTagWarningSkipButton.propTypes = {
  stepConfigurationModel: PropTypes.object,
  setStepConfigurationModel: PropTypes.func,
  savePipelineStepConfiguration: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setBusy: PropTypes.func,
};