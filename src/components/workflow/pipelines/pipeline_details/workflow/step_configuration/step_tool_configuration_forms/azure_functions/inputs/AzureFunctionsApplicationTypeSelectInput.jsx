import React from "react";
import PropTypes from "prop-types";
import AzureApplicationTypeSelectInput
  from "components/common/list_of_values_input/tools/azure/application_types/AzureApplicationTypeSelectInput";

function AzureFunctionsApplicationTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolId,
    azureApplicationId,
    disabled,
  }) {
  return (
    <AzureApplicationTypeSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      azureToolId={azureToolId}
      azureToolApplicationId={azureApplicationId}
    />
  );
}

AzureFunctionsApplicationTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolId: PropTypes.string,
  azureApplicationId: PropTypes.string,
  disabled: PropTypes.bool,
};

AzureFunctionsApplicationTypeSelectInput.defaultProps = {
  fieldName: "applicationType",
};

export default AzureFunctionsApplicationTypeSelectInput;