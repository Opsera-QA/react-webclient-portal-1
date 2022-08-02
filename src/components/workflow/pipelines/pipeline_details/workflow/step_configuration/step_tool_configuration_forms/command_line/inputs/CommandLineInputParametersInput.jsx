import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterMappingInputBase from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/ParameterSelectListInputBase";

function CommandLineInputParametersInput({ model, setModel, disabled, fieldName, plan }) {    
  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("saveEnvironmentVariables", !model.getData("saveEnvironmentVariables"));
    newDataObject.setDefaultValue("environmentVariables");
    newDataObject.setDefaultValue("customParameters");
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
          type={"Parameter"}
          regexValidationRequired={false}
          titleText={"Input Parameters Mapping"}
        />
      );
    }

    return (
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={model}
        setDataObject={setModel}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Input Parameter Selection"}
        plan={plan}
        tool_prop={model?.getData("terraformStepId") && model?.getData("terraformStepId").length > 0 ? model?.getData("terraformStepId") : ""}
      />
    );

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

CommandLineInputParametersInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
};


CommandLineInputParametersInput.defaultProps = {
  fieldName: "environmentVariables",
  disabled: false
};

export default CommandLineInputParametersInput;
