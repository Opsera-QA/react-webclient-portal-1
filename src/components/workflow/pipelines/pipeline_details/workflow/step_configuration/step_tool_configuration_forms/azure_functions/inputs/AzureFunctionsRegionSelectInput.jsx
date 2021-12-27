import React from "react";
import PropTypes from "prop-types";
import AzureRegionSelectInput from "components/common/list_of_values_input/tools/azure/regions/AzureRegionSelectInput";

function AzureFunctionsRegionSelectInput({ fieldName, model, setModel, azureToolId, azureApplicationId, disabled }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption?.name);
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    setModel({...newDataObject});
  };

  return (
    <AzureRegionSelectInput
      azureToolApplicationId={azureApplicationId}
      azureToolId={azureToolId}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

AzureFunctionsRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string,
  azureApplicationId: PropTypes.string,
  disabled: PropTypes.bool
};

AzureFunctionsRegionSelectInput.defaultProps = {
  fieldName: "azureRegion",
};

export default AzureFunctionsRegionSelectInput;
