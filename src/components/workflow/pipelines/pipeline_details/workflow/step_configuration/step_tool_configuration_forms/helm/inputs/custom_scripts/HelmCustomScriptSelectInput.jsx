import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function HelmCustomScriptSelectInput({model, setModel, disabled}) {

  const JOB_TYPES = [
    {
      name: "Custom Script",
      value: true,
    },
    {
      name: "Opsera Script",
      value: false,
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.value);
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("organizationName", "");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData("environmentVariables", []);
    newModel.setData("commands", "");
    newModel.setData("keyValueMap", {});
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("organizationName", "");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData("environmentVariables", []);
    newModel.setData("commands", "");
    newModel.setData("keyValueMap", {});
    setModel({...newModel});
  };


  return (
    <SelectInputBase
      fieldName={"customScript"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Helm Execution Script"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

HelmCustomScriptSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default HelmCustomScriptSelectInput;