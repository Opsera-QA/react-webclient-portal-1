import React from "react";
import PropTypes from "prop-types";
import ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/fields/ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput";

export default function ExternalApiIntegrationStepRunResponseParameterSelectInput(
  {
    model,
    setModel,
    toolId,
    runEndpointId,
    disabled,
  }) {
  // TODO: Clear out other fields
  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption?.fieldName);
    // model?.setDefaultValue("statusEndpointRequestParameters");
    // model?.setDefaultValue("statusEndpointResponseEvaluationRules");
    setModel({...model});
  };

  return (
    <ExternalApiIntegratorToolEndpointResponseBodyFieldSelectInput
      fieldName={"runEndpointFieldName"}
      toolId={toolId}
      endpointId={runEndpointId}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
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
};
