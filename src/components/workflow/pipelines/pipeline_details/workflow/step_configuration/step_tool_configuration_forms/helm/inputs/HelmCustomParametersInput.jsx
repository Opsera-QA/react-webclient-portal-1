import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import HelmEnvironmentVariables from "./custom_scripts/HelmEnvironmentVariables";

function HelmCustomParametersInput({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    if (fieldName === "saveParameters") newDataObject.setData("customParameters", []);
    if (fieldName === "saveInputParameters") newDataObject.setData("inputParameters", []);
    if (fieldName === "saveEnvironmentVariables") newDataObject.setData("environmentVariables", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("saveEnvironmentVariables") === true && fieldName === "saveEnvironmentVariables") {
      return (
        <HelmEnvironmentVariables
          dataObject={model}
          setDataObject={setModel}
          disabled={disabled}
        />
      );
    }
  };

  if (model == null) {
    return null;
  }

  if (model?.getData("customScript") && fieldName === "saveInputParameters") {
    return null;
  }

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
      />
      {getParametersInput()}
    </>
  );
}

HelmCustomParametersInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

export default HelmCustomParametersInput;