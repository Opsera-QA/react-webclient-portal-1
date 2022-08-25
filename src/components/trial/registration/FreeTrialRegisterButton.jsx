import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function FreeTrialRegisterButton(
  {
    registrationModel,
    registerAccountFunction,
    className,
    disabled,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const { toastContext, isMounted, cancelTokenSource } = useComponentStateReference();

  const createFreeTrialAccount = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await registerAccountFunction();
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
    } catch (error) {
      if (isMounted.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showFormErrorBanner(error, "There was an error registering your Opsera account:");
      }
    }
  };

  if (registrationModel == null || registerAccountFunction == null) {
    return null;
  }

  return (
    <VanityButtonBase
      normalText={"Continue"}
      busyText={"Registering Account"}
      errorText={"Error Registering Account"}
      successText={"Successfully Registered Account"}
      className={className}
      variant={"success"}
      icon={faArrowRight}
      onClickFunction={createFreeTrialAccount}
      disabled={disabled || registrationModel.checkCurrentValidity() !== true}
      buttonState={buttonState}
    />
  );
}

FreeTrialRegisterButton.propTypes = {
  registrationModel: PropTypes.object,
  registerAccountFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};