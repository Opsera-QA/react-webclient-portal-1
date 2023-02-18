import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const ACTION_LIST = [
  {
    name: "Azure Tool",
    value: "azure",
  },
  {
    name: "Legacy Azure Connector",
    value: "azure_account",
  },
];

function AzureAcrPushStepToolTypeSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = async (fieldName, value) => {
    model.setData("toolType", value?.value);
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("azureRepoName");
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureCredentialId");
    model.setDefaultValue("azureToolConfigId");
    model.setDefaultValue("newRepo");
    setModel({ ...model });
  };

  const clearDataFunction = () => {
    model.setDefaultValue("toolType");
    model.setDefaultValue("azureRegistryName");
    model.setDefaultValue("azureRepoName");
    model.setDefaultValue("acrLoginUrl");
    model.setDefaultValue("azureCredentialId");
    model.setDefaultValue("azureToolConfigId");
    model.setDefaultValue("newRepo");
    setModel({ ...model });
  };

  return (
    <SelectInputBase
      fieldName={"toolType"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      singularTopic={"Tool Type"}
      pluralTopic={"Tool Types"}
      disabled={disabled}
    />
  );
}

AzureAcrPushStepToolTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default AzureAcrPushStepToolTypeSelectInput;
