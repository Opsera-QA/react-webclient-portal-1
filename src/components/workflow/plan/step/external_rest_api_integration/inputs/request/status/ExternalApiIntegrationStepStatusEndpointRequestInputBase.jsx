import React, {useEffect} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";
import ExternalApiIntegratorStatusEndpointApiConfigurationInputBase
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/status/ExternalApiIntegratorStatusEndpointApiConfigurationInputBase";
import useGetExternalApiIntegratorEndpointById
  from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpointById";

export default function ExternalApiIntegrationStepStatusEndpointRequestInputBase(
  {
    model,
    setModel,
    fieldName,
    toolId,
    endpointId,
    disabled,
  }) {
  const {
    endpoint,
    isLoading,
    error,
  } = useGetExternalApiIntegratorEndpointById(
    toolId,
    endpointId,
  );

  useEffect(() => {}, []);

  return (
    <div>
      <InfoText errorMessage={error} />
      <ExternalApiIntegratorStatusEndpointApiConfigurationInputBase
        fieldName={fieldName}
        height={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_REQUEST_PARAMETER_CONTAINER_HEIGHT}
        endpointParameterInputHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_REQUEST_PARAMETER_INPUT_HEIGHT}
        endpointParameterArrayInputHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_PARAMETER_ARRAY_INPUT_HEIGHT}
        isLoading={isLoading}
        model={model}
        setModel={setModel}
        disabled={disabled}
        endpoint={endpoint}
      />
    </div>
  );
}

ExternalApiIntegrationStepStatusEndpointRequestInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
  disabled: PropTypes.bool,
};
