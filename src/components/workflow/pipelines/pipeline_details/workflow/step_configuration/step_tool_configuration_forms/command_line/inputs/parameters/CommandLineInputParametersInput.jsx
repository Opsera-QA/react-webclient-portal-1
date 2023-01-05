import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInput";

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
        <EditableParameterMappingInput
          model={model}
          setModel={setModel}
          fieldName={fieldName}
          nameMaxLength={50}
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
        titleText={"Input Parameters"}
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
