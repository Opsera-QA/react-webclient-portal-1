import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function AzureFunctionsStepServiceNameTextInput({ azureFunctionsModel, setAzureFunctionsModel, disabled }) {
  if (azureFunctionsModel?.getData("dynamicServiceName") === true) {
    return null;
  }

  return (
    <TextInputBase
      dataObject={azureFunctionsModel}
      setDataObject={setAzureFunctionsModel}
      fieldName={"azureFunctionsServiceName"}
      disabled={disabled}
    />
  );
}

AzureFunctionsStepServiceNameTextInput.propTypes = {
  azureFunctionsModel: PropTypes.object,
  setAzureFunctionsModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureFunctionsStepServiceNameTextInput;
