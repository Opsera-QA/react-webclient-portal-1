import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

export default function CommandLineStepSaveEnvironmentVariablesBooleanToggle(
  {
    model,
    setModel,
    disabled,
    className,
  }) {
  // TODO: Add confirmation
  const setDataFunction = () => {
    model?.setData("saveEnvironmentVariables", !model?.getData("saveEnvironmentVariables"));
    model?.setDefaultValue("environmentVariables");
    model?.setDefaultValue("customParameters");
    setModel({...model});
  };

  return (
    <BooleanToggleInput
      className={className}
      setDataObject={setModel}
      dataObject={model}
      setDataFunction={setDataFunction}
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