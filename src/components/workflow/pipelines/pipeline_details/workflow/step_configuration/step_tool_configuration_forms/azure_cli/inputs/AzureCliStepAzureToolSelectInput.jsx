import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureToolSelectInput
  from "components/common/list_of_values_input/tools/azure/tools/RoleRestrictedAzureToolSelectInput";

function AzureCliStepAzureToolSelectInput({ fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("azureRegion", "");
    newDataObject.setData("machine_type", "");
    newDataObject.setData("resourceGroupName", "");
    newDataObject.setData(fieldName, selectedOption?._id);
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("azureCredentialId", "");
    newDataObject.setData("azureRegion", "");
    newDataObject.setData("applicationType", "");
    newDataObject.setData("artifactStepId", "");
    newDataObject.setData("resourceGroupName", "");
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

AzureCliStepAzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureCliStepAzureToolSelectInput.defaultProps = {
  fieldName: "azureToolConfigId",
};

export default AzureCliStepAzureToolSelectInput;
