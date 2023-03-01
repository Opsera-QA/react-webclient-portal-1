import React from "react";
import PropTypes from "prop-types";
import AzureToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";

export default function AzureAcrPushCredentialIdSelectInput(
  {
    fieldName,
    model,
    setModel,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData(fieldName, selectedOption._id);
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("newRepo");
    model.setDefaultValue("azureRepoName");
    setModel({...model});
  };

  const clearDataFunction = () => {
    model.setData(fieldName, "");
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("newRepo");
    model.setDefaultValue("azureRepoName");
    setModel({...model});
  };

  if (model?.getData("toolType") !== "azure") {
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

AzureAcrPushCredentialIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureConfig:PropTypes.object,
  setApplicationData: PropTypes.func,
  
};

AzureAcrPushCredentialIdSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};
