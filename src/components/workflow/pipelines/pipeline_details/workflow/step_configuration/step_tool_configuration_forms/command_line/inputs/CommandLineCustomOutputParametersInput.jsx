import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterMappingInputBase from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";

function CommandLineCustomOutputParametersInput({ model, setModel, disabled, fieldName }) {    
  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("saveEnvironmentVariables", !model.getData("saveEnvironmentVariables"));
    newDataObject.setDefaultValue("environmentVariables");
    setModel({ ...newDataObject });
  };

  const getParametersInput = () => {
    if (model.getData("saveEnvironmentVariables") === true) {
      return (
        <ParameterMappingInputBase
          titleIcon={faHandshake}
          dataObject={model}
          setDataObject={setModel}
          fieldName={fieldName}
          allowIncompleteItems={false}
          type={"Dynamic Parameter Mappings"}
          regexValidationRequired={false}
          titleText={"Dynamic Parameters Mapping"}
        />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={"saveEnvironmentVariables"}
        disabled={disabled}
      />
      {getParametersInput()}
    </>
  );
}

CommandLineCustomOutputParametersInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


CommandLineCustomOutputParametersInput.defaultProps = {
  fieldName: "environmentVariables",
  disabled: false
};

export default CommandLineCustomOutputParametersInput;
