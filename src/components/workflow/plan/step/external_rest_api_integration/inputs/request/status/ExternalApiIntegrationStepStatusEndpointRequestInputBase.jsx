import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import InfoText from "components/common/inputs/info_text/InfoText";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";
import ExternalApiIntegratorStatusEndpointApiConfigurationInputBase
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/status/ExternalApiIntegratorStatusEndpointApiConfigurationInputBase";

export default function ExternalApiIntegrationStepStatusEndpointRequestInputBase(
  {
    model,
    setModel,
    fieldName,
    toolId,
    endpointId,
    disabled,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [endpoint, setEndpoint] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setEndpoint(undefined);

    if (isMongoDbId(toolId) === true && isMongoDbId(endpointId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [fieldName, toolId, endpointId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadExternalApiIntegratorEndpoints(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadExternalApiIntegratorEndpoints = async (cancelSource = cancelTokenSource) => {
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointByIdV2(
      getAccessToken,
      cancelSource,
      toolId,
      endpointId,
    );
    const newEndpoint = response?.data?.data;

    if (isMounted?.current === true && newEndpoint) {
      setEndpoint(newEndpoint);
    }
  };

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
