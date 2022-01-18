import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function ArgoAzurePlatformSelectInput({ fieldName, model, setModel, disabled, textField, valueField }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData("azureApplicationId", "");
    newDataObject.setData("clusterName", "");
    newDataObject.setData("resourceGroup", "");
    newDataObject.setData("clientId", "");
    newDataObject.setData("clientSecret", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("azureApplicationId", "");
    newDataObject.setData("clusterName", "");
    newDataObject.setData("resourceGroup", "");
    newDataObject.setData("clientId", "");
    newDataObject.setData("clientSecret", "");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedAzureToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}      
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );  
}

ArgoAzurePlatformSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

ArgoAzurePlatformSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "platformToolId",  
};

export default ArgoAzurePlatformSelectInput;
