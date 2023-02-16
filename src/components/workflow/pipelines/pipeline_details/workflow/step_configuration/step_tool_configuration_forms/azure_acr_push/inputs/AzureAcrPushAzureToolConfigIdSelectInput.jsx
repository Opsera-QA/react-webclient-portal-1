import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureAccountToolSelectInput from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function AzureAcrPushAzureToolConfigIdSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  service,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData(fieldName, selectedOption._id);
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("azureRepoName");
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureCredentialId");
    model.setDefaultValue("newRepo");
    setModel({ ...model });
  };

  const clearDataFunction = () => {
    model.setDefaultValue(fieldName);
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("azureRepoName");
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureCredentialId");
    model.setDefaultValue("newRepo");
    setModel({ ...model });
  };

  return (
    <RoleRestrictedAzureAccountToolSelectInput
      fieldName={fieldName}
      service={service}
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
  service: PropTypes.string,
};

AzureAcrPushAzureToolConfigIdSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",
};

export default AzureAcrPushAzureToolConfigIdSelectInput;
