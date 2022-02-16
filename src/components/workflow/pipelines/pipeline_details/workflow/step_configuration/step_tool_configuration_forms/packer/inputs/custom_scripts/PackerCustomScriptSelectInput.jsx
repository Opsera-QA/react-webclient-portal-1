import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function PackerCustomScriptSelectInput({dataObject, setDataObject, disabled}) {

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
    let newModel = {...dataObject};
    newModel.setData(fieldName, selectedOption.value);
    newModel.setData("stateRemote", false);
    newModel.setData("saveInputParameters", false);
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("terraformCloudId", "");
    newModel.setData("organizationName", "");
    newModel.setData("backendState", "LOCAL");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData("inputParameters", []);
    newModel.setData("environmentVariables", []);
    newModel.setData("terraformCommands", "");
    newModel.setData("keyValueMap", {});
    setDataObject({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...dataObject};
    newModel.setData("backendState", "");
    newModel.setData("saveInputParameters", false);
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("terraformCloudId", "");
    newModel.setData("organizationName", "");
    newModel.setData("backendState", "LOCAL");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData("inputParameters", []);
    newModel.setData("environmentVariables", []);
    newModel.setData("terraformCommands", "");
    newModel.setData("keyValueMap", {});
    setDataObject({...newModel});
  };


  return (
    <SelectInputBase
      fieldName={"customScript"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Packer Execution Script"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

PackerCustomScriptSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default PackerCustomScriptSelectInput;
