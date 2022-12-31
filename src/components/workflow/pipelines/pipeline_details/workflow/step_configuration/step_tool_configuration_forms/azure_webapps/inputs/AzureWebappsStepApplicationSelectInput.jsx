import React from "react";
import PropTypes from "prop-types";
import AzureToolApplicationSelectInput
  from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";

function AzureWebappsStepApplicationSelectInput({fieldName, model, setModel, azureToolId}) {
  // TODO: We should be pulling the applications based on ID in next input
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData("azureRegion", "");
    newDataObject.setData("machine_type", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("azureRegion", "");
    newDataObject.setData("applicationType", "");
    newDataObject.setData("artifactStepId", "");
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

AzureWebappsStepApplicationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string.isRequired,
};

AzureWebappsStepApplicationSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};

export default AzureWebappsStepApplicationSelectInput;
