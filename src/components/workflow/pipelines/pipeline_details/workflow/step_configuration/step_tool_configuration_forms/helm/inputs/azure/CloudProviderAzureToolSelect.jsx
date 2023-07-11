import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function CloudProviderAzureToolSelect({ fieldName, model, setModel, disabled, textField, valueField}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setDefaultValue("azureCredentialId");
    newModel.setData(fieldName, selectedOption?._id);
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("namespace");
    newModel.setDefaultValue("resourceGroup");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue(fieldName);
    newModel.setDefaultValue("azureToolConfigId");
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("clusterName");
    newModel.setDefaultValue("namespace");
    newModel.setDefaultValue("resourceGroup");
    setModel({...newModel});
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

CloudProviderAzureToolSelect.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

CloudProviderAzureToolSelect.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",

};

export default CloudProviderAzureToolSelect;
