import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function AksDeployStepAzureToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField , setAzureConfig}) {
  const setDataFunction = (fieldName, selectedOption) => {
    setAzureConfig(selectedOption);
    let newDataObject = {...dataObject};
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("region", "");
    newDataObject.setData("machine_type", "");
    newDataObject.setData(fieldName, selectedOption?._id);
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
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

AksDeployStepAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  setAzureToolConfigObj: PropTypes.func,
  setAzureConfig:PropTypes.func,
};

AksDeployStepAzureToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "azureToolConfigId",
  
};

export default AksDeployStepAzureToolSelectInput;
