import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformRemoteStateCloudSelect({dataObject, setDataObject, disabled}) {

  const JOB_TYPES = [
    {
      name: "AWS S3",
      value: "S3",
    },
    {
      name: "Azure",
      value: "AZURERM",
    },
    {
      name: "Terraform Cloud",
      value: "TERRAFORM_CLOUD",
    },
    {
      name: "Local",
      value: "LOCAL",
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...dataObject};
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("terraformCloudId", "");
    newModel.setData("organizationName", "");
    newModel.setData("backendState", "");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData("backendState", selectedOption.value);
    setDataObject({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...dataObject};
    newModel.setData("backendState", "");
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureToolConfigId", "");
    newModel.setData("terraformCloudId", "");
    newModel.setData("organizationName", "");
    newModel.setData("backendState", "local");
    newModel.setData("azureCredentialId", "");
    newModel.setData("bucketName", "");
    setDataObject({...newModel});
  };


  return (
    <SelectInputBase
      fieldName={"backendState"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a Remote State Location"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

TerraformRemoteStateCloudSelect.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformRemoteStateCloudSelect;