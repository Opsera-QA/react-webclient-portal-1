import React from "react";
import PropTypes from "prop-types";
import ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/fields/ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput";

export default function ExternalApiIntegrationStepRunResponseParameterSelectInput(
  {
    model,
    setModel,
    toolId,
    runEndpointId,
    setDataFunction,
    disabled,
  }) {
  const handleSetDataFunction = (fieldName, selectedOption) => {
    setDataFunction(fieldName, selectedOption?.fieldName);
  };

  return (
    <ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput
      fieldName={"value"}
      toolId={toolId}
      endpointId={runEndpointId}
      model={model}
      setModel={setModel}
      setDataFunction={handleSetDataFunction}
      disabled={disabled}
    />
  );
}

ExternalApiIntegrationStepRunResponseParameterSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  runEndpointId: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};
