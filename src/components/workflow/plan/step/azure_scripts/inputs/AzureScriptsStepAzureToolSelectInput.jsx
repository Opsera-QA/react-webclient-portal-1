import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function AzureScriptsStepAzureToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setDefaultValue("azureCredentialId",);
    newModel.setDefaultValue("inlineCommand");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("filePath");
    newModel.setDefaultValue("fileName");
    newModel.setData(fieldName, selectedOption?._id);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setDefaultValue("azureCredentialId",);
    newModel.setDefaultValue("inlineCommand");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("filePath");
    newModel.setDefaultValue("fileName");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedAzureToolSelectInput
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      model={model}
      setModel={setModel}
      fieldName={fieldName}
    />
  );
}

AzureScriptsStepAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureScriptsStepAzureToolSelectInput.defaultProps = {
  fieldName: "azureToolConfigId",
};

export default AzureScriptsStepAzureToolSelectInput;
