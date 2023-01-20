import React, {useState} from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";
import IconBase from "components/common/icons/IconBase";
import {faCheckCircle, faSave} from "@fortawesome/pro-light-svg-icons";
import {Button} from "react-bootstrap";

export default function CommandLineStepSaveEnvironmentVariablesBooleanToggle(
  {
    model,
    setModel,
    disabled,
    className,
  }) {
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const setDataFunction = () => {
    model?.setData("saveEnvironmentVariables", !model?.getData("saveEnvironmentVariables"));
    model?.setDefaultValue("environmentVariables");
    model?.setDefaultValue("customParameters");
    setModel({...model});
  };

  if (showConfirmationMessage === true) {
    return (
      <div className={"d-flex"}>
        <div>Switching this setting will clear out Global Parameters. Would you like to proceed?</div>
        <VanityButtonBase
          className={"ml-2"}
          buttonSize={"sm"}
          variant={"primary"}
          onClickFunction={setDataFunction}
          icon={faCheckCircle}
          normalText={"Proceed"}
        />
        <CancelButtonBase
          className={"ml-2"}
          size={"sm"}
          cancelFunction={() => setShowConfirmationMessage(false)}
        />
      </div>
    );
  }

  return (
    <BooleanToggleInput
      className={className}
      setDataObject={setModel}
      dataObject={model}
      setDataFunction={() => setShowConfirmationMessage(true)}
      fieldName={"saveEnvironmentVariables"}
      disabled={disabled}
    />
  );
}

CommandLineStepSaveEnvironmentVariablesBooleanToggle.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};