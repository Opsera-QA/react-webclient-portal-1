import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ExternalApiIntegrationStepConnectionCheckEndpointSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, value) => {
    const newModel = {...model};
    newModel?.setData(fieldName, value);
    newModel?.setDefaultValue("connectionCheckEndpointId");
    newModel?.setDefaultValue("connectionCheckRequestParameters");
    newModel?.setDefaultValue("connectionCheckResponseEvaluationRules");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      fieldName={"useConnectionCheck"}
      toolId={model?.getData("toolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

ExternalApiIntegrationStepConnectionCheckEndpointSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExternalApiIntegrationStepConnectionCheckEndpointSelectInput;