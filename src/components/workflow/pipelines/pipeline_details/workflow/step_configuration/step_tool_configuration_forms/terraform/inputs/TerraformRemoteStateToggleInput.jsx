import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function TerraformRemoteStateToggleInput({dataObject, setDataObject, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    let sourceScriptFlag = !dataObject.getData(fieldName);
    newDataObject.setData(fieldName, sourceScriptFlag);
    newDataObject.setData("backendState", "local");
    newDataObject.setData("resourceGroup", "");
    newDataObject.setData("storageName", "");
    newDataObject.setData("containerName", "");
    newDataObject.setData("azureToolConfigId", "");
    newDataObject.setData("terraformCloudId", "");
    newDataObject.setData("organizationName", "");
    newDataObject.setData("backendState", "");
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("bucketName", "");
    setDataObject({...newDataObject});
  };

  return (
    <BooleanToggleInput
      fieldName={"isStateRemote"}
      setDataFunction={setDataFunction}
      dataObject={dataObject}
      setDataObject={setDataObject}
      disabled={disabled}
    />
  );
}

TerraformRemoteStateToggleInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformRemoteStateToggleInput;