import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureAccountToolSelectInput
  from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function AzureAcrPushAzureToolConfigIdSelectInput(
  { 
    fieldName, 
    model, 
    setModel, 
    disabled, 
    textField, 
    valueField, 
  }) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setData('azureRegistryName', "");
    newModel.setData('azureRepoName', "");
    newModel.setData('acrLoginUrl', "");
    newModel.setData('newRepo', false);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setData('azureRegistryName', "");
    newModel.setData('azureRepoName', "");
    newModel.setData('acrLoginUrl', "");
    newModel.setData('newRepo', false);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedAzureAccountToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      textField={textField}
      valueField={valueField} 
      clearDataFunction={clearDataFunction}
      setDataFunction={setDataFunction}
    />
  );
}

AzureAcrPushAzureToolConfigIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

AzureAcrPushAzureToolConfigIdSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",
  
};

export default AzureAcrPushAzureToolConfigIdSelectInput;
