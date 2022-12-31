import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TERRAFORM_WORKFLOW_TYPES = [
  {
    text: "CLI",
    value: "CLI"
  },
  {
    text: "VCS",
    value: "VCS"
  },
];

function TerraformWorkflowSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId}) {
  
  const setDataFunction = ( fieldName, selectedOption ) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("workingDirectory", "");
    newDataObject.setData("version", "");
    newDataObject.setData("service", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("provider", "");
    newDataObject.setData("providerId", "");
    newDataObject.setData("oauthToken", "");
    newDataObject.setData("repository", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = ( fieldName ) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData("workingDirectory", "");
    newDataObject.setData("version", "");
    newDataObject.setData("service", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("provider", "");
    newDataObject.setData("providerId", "");
    newDataObject.setData("oauthToken", "");
    newDataObject.setData("repository", "");
    setDataObject({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={TERRAFORM_WORKFLOW_TYPES}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select Workflow Type"}
        disabled={disabled}
      />
  );
}

TerraformWorkflowSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string
};

TerraformWorkflowSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  fieldName: "workFlowType",
  disabled: false
};

export default TerraformWorkflowSelectInput;
