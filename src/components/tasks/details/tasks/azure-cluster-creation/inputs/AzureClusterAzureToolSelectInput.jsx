import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function AzureClusterAzureToolSelectInput({ fieldName, dataObject, setDataObject, disabled, setAzureConfig}) {
  const setDataFunction = (fieldName, selectedOption) => {
    setAzureConfig(selectedOption);
    let newDataObject = {...dataObject};
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("region", "");
    newDataObject.setData("machine_type", "");
    newDataObject.setData(fieldName, selectedOption._id);
    setDataObject({...newDataObject});
  };

  const clearDataFunction=()=>{
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("region", "");
    newDataObject.setData("machine_type", "");
    setAzureConfig(null);  
    setDataObject({...newDataObject});
  };


  return (
    <RoleRestrictedAzureToolSelectInput
      fieldName={fieldName}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

AzureClusterAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setAzureConfig:PropTypes.func,
};

AzureClusterAzureToolSelectInput.defaultProps = {
  fieldName: "azureToolConfigId",
  
};

export default AzureClusterAzureToolSelectInput;
