import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";

function AzureWebappsDeploymentTypeSelectInput(
  {model, setModel, disabled, fieldName}) {

  const JOB_TYPES = [
    {
      name: "Package Deployment",
      value: "package",
    },
    {
      name: "Docker Deployment",
      value: "docker",
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("artifactStepId", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("artifactStepId", "");
    setModel({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Deployment Type"}
      disabled={disabled}
      busy={disabled}
    />
  );
}


AzureWebappsDeploymentTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureWebappsDeploymentTypeSelectInput.defaultProps = {
  fieldName: "deploymentType",
  disabled: false
};

export default AzureWebappsDeploymentTypeSelectInput;
