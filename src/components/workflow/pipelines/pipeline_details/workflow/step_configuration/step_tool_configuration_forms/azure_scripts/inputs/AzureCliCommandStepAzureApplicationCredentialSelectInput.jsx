import React from "react";
import PropTypes from "prop-types";
import AzureToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";

function AzureCliCommandStepAzureApplicationCredentialSelectInput({fieldName, model, setModel, azureToolId, setApplicationData}) {
  // TODO: We should be pulling the applications based on ID in next input
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData("inline", "");
    newDataObject.setData("type", "");
    newDataObject.setData("filePath", "");
    newDataObject.setData("fileName", "");
    setApplicationData(selectedOption?.configuration);
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("inline", "");
    newDataObject.setData("type", "");
    newDataObject.setData("filePath", "");
    newDataObject.setData("fileName", "");
    setApplicationData(null);
    setModel({...newDataObject});
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

AzureCliCommandStepAzureApplicationCredentialSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
  setApplicationData: PropTypes.func,
};

AzureCliCommandStepAzureApplicationCredentialSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};

export default AzureCliCommandStepAzureApplicationCredentialSelectInput;
