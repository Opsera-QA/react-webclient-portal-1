import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformStateMethodSelect({dataObject, setDataObject, disabled}) {

  const JOB_TYPES = [
    {
      name: "Automatic",
      value: "automatic",
    },
    {
      name: "Manual (Managed by Opsera)",
      value: "manual",
    }
  ];

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...dataObject};
    newModel.setData("resourceGroup", "");
    newModel.setData("storageName", "");
    newModel.setData("containerName", "");
    newModel.setData("azureCPToolConfigId", "");
    newModel.setData("terraformCloudId", "");
    newModel.setData("organizationName", "");
    newModel.setData("azureCPCredentialId", "");
    newModel.setData("bucketName", "");
    newModel.setData(fieldName, selectedOption.value);
    setDataObject({...newModel});
  };

  return (
    <SelectInputBase
      fieldName={"stateFile"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={JOB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select a State File Management Method"}
      disabled={disabled}
      busy={disabled}
    />
  );
}

TerraformStateMethodSelect.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformStateMethodSelect;