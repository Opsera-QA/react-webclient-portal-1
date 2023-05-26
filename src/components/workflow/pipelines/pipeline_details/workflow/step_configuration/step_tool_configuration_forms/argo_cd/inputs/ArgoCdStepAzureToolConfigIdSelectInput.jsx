import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureAccountToolSelectInput from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function ArgoCdStepAzureToolConfigIdSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  service,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue(fieldName);
    newModel.setDefaultValue("azureCredentialId");
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({ ...newModel });
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

ArgoCdStepAzureToolConfigIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  service: PropTypes.string,
};

ArgoCdStepAzureToolConfigIdSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "azureToolConfigId",
};

export default ArgoCdStepAzureToolConfigIdSelectInput;
