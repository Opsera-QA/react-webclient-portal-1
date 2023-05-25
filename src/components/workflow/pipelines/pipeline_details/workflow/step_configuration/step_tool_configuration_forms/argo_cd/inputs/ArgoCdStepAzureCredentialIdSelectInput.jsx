import React from "react";
import PropTypes from "prop-types";
import AzureToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";

export default function ArgoCdStepAzureCredentialIdSelectInput(
  {
    fieldName,
    model,
    setModel,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue(fieldName);
    newModel.setDefaultValue("acrLoginUrl");
    newModel.setDefaultValue("azureRegistryName");
    newModel.setDefaultValue("azureRepoName");
    newModel.setDefaultValue("repositoryTag");
    newModel.setDefaultValue("imageUrl");
    setModel({...newModel});
  };

  if (model?.getData("platform") !== "azure") {
    return null;
  }

  return (
    <AzureToolApplicationSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      azureToolId={model?.getData("azureToolConfigId")}
      fieldName={"azureCredentialId"}
    />
  );
}

ArgoCdStepAzureCredentialIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureConfig:PropTypes.object,
  setApplicationData: PropTypes.func,
  
};

ArgoCdStepAzureCredentialIdSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};
