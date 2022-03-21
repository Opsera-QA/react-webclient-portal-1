import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedExternalApiIntegratorToolSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/tool/RoleRestrictedExternalApiIntegratorToolSelectInput";

function ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel?.setData(fieldName, selectedOption?._id);
    newModel?.setDefaultValue("runEndpointId");
    newModel?.setDefaultValue("runEndpointRequestParameters");
    newModel?.setDefaultValue("runEndpointResponseEvaluationParameters");
    newModel?.setDefaultValue("statusEndpointId");
    newModel?.setDefaultValue("statusEndpointRequestParameters");
    newModel?.setDefaultValue("statusEndpointResponseEvaluationParameters");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedExternalApiIntegratorToolSelectInput
      fieldName={"toolId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput;