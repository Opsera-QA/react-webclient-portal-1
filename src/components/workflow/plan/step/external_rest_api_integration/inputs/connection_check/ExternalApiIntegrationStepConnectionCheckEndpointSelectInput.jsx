import React from "react";
import PropTypes from "prop-types";
import ExternalApiIntegratorToolEndpointSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/ExternalApiIntegratorToolEndpointSelectInput";

function ExternalApiIntegrationStepConnectionCheckEndpointSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?._id);
    newModel?.setDefaultValue("connectionCheckRequestParameters");
    newModel?.setDefaultValue("connectionCheckResponseEvaluationRules");
    setModel({...newModel});
  };

  return (
    <ExternalApiIntegratorToolEndpointSelectInput
      fieldName={"connectionCheckEndpointId"}
      toolId={model?.getData("toolId")}
      model={model}
      setModel={setModel}
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