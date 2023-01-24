import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function HelmCustomScriptSelectInput({dataObject, setDataObject, disabled}) {

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
    setDataObject({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...dataObject};
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
      placeholderText={"Select Helm Execution Script"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

HelmCustomScriptSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default HelmCustomScriptSelectInput;