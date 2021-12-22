import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";

function AzureFunctionsDeploymentTypeSelectInput(
  {model, setModel, disabled, fieldName}) {

  const JOB_TYPES = [
    {
      name: "Zip Deployment",
      value: "zip",
    },
    {
      name: "Docker Deployment",
      value: "docker",
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("resourceGroupName", "");
    newDataObject.setData("artifactStepId", "");
    newDataObject.setData("useCustomResourceGroup", "");
    setModel({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Deployment Type"}
      disabled={disabled}
      busy={disabled}
    />
  );
}


AzureFunctionsDeploymentTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureFunctionsDeploymentTypeSelectInput.defaultProps = {
  fieldName: "deploymentType",
  disabled: false
};

export default AzureFunctionsDeploymentTypeSelectInput;
