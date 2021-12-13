import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function AzureZipDeploymentStepAzureToolSelectInput({ fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption?._id);
    newDataObject.setDefaultValue("azureCredentialId");
    newDataObject.setDefaultValue("azureStorageAccountName");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    const newDataObject = {...model};
    newDataObject.setDefaultValue(fieldName);
    newDataObject.setDefaultValue("azureCredentialId");
    newDataObject.setDefaultValue("azureStorageAccountName");
    setModel({...newDataObject});
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

AzureZipDeploymentStepAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureZipDeploymentStepAzureToolSelectInput.defaultProps = {
  fieldName: "azureToolId",
};

export default AzureZipDeploymentStepAzureToolSelectInput;
