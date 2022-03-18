import React from "react";
import PropTypes from "prop-types";
import ExternalApiIntegratorToolEndpointSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/ExternalApiIntegratorToolEndpointSelectInput";

function ExternalApiIntegrationStepRunEndpointSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?._id);
    newModel?.setDefaultValue("runEndpointRequestParameters");
    newModel?.setDefaultValue("runEndpointResponseSuccessParameters");
    setModel({...newModel});
  };

  return (
    <ExternalApiIntegratorToolEndpointSelectInput
      fieldName={"runEndpointId"}
      toolId={model?.getData("toolId")}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

ExternalApiIntegrationStepRunEndpointSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExternalApiIntegrationStepRunEndpointSelectInput;