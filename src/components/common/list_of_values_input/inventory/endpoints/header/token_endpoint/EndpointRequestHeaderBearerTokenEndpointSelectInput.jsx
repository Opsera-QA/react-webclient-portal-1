import React from "react";
import PropTypes from "prop-types";
import ExternalApiIntegratorToolEndpointSelectInput
from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/ExternalApiIntegratorToolEndpointSelectInput";

function EndpointRequestHeaderBearerTokenEndpointSelectInput(
  {
    toolId,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?._id);
    newModel?.setDefaultValue("accessTokenResponseBodyField");
    setModel({...newModel});
  };

  return (
    <ExternalApiIntegratorToolEndpointSelectInput
      fieldName={"accessTokenGenerationEndpointId"}
      toolId={toolId}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

EndpointRequestHeaderBearerTokenEndpointSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
};

export default EndpointRequestHeaderBearerTokenEndpointSelectInput;