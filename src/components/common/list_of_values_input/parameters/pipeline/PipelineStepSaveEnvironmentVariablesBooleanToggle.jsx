import React, {useState} from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";

export default function PipelineStepSaveEnvironmentVariablesBooleanToggle(
  {
    model,
    setModel,
    disabled,
    className,
    visible,
    environmentVariablesFieldName,
    customParametersFieldName,
  }) {
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const setDataFunction = () => {
    model?.setData("saveEnvironmentVariables", !model?.getData("saveEnvironmentVariables"));
    model?.setDefaultValue(environmentVariablesFieldName);
    model?.setDefaultValue(customParametersFieldName);
    setModel({...model});
  };

  if (showConfirmationMessage === true) {
    return (
      <div className={"d-flex mb-auto"}>
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

  if (visible === false) {
    return null;
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

PipelineStepSaveEnvironmentVariablesBooleanToggle.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  visible: PropTypes.bool,
  environmentVariablesFieldName: PropTypes.string,
  customParametersFieldName: PropTypes.string,
};

PipelineStepSaveEnvironmentVariablesBooleanToggle.defaultProps = {
  environmentVariablesFieldName: "environmentVariables",
  customParametersFieldName: "customParameters",
};