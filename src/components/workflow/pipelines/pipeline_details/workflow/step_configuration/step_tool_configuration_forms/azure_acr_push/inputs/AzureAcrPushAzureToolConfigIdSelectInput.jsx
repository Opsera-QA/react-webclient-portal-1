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
    setAzureConfig,
  }) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    setAzureConfig(selectedOption);
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption.id);
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
    setAzureConfig(null);
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
  setAzureConfig:PropTypes.func,
};

AzureAcrPushAzureToolConfigIdSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",
  
};

export default AzureAcrPushAzureToolConfigIdSelectInput;
