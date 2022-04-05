import React from "react";
import PropTypes from "prop-types";
import AzureToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";

function AzureScriptsStepAzureApplicationCredentialSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolId,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData(fieldName, selectedOption?._id);
    newModel.setDefaultValue("inline");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("filePath");
    newModel.setDefaultValue("fileName");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    const newModel = {...model};
    newModel.setDefaultValue(fieldName);
    newModel.setDefaultValue("inline");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("filePath");
    newModel.setDefaultValue("fileName");
    setModel({...newModel});
  };

  return (
    <AzureToolApplicationSelectInput
      model={model}
      setModel={setModel}
      azureToolId={azureToolId}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

AzureScriptsStepAzureApplicationCredentialSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
};

AzureScriptsStepAzureApplicationCredentialSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};

export default AzureScriptsStepAzureApplicationCredentialSelectInput;
