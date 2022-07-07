import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import {AuthContext} from "contexts/AuthContext";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";

function EndpointResponseEvaluationRulesInput(
  {
    toolId,
    endpointId,
    fieldName,
    evaluationRuleFieldName,
    model,
    setModel,
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
  }, [toolId, endpointId, fieldName]);

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

  if (isMongoDbId(endpointId) !== true) {
    return (
      <CenteredContentWrapper>
        <div className={"my-5"}>
          An External API Integrator Tool and Endpoint must be selected before you can configure evaluation rules.
        </div>
      </CenteredContentWrapper>
    );
  }

  if (endpoint == null) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <EndpointResponseEvaluationRulesInputBase
        model={model}
        setModel={setModel}
        isLoading={isLoading}
        fieldName={fieldName}
        evaluationRuleFieldName={evaluationRuleFieldName}
        endpoint={endpoint}
        disabled={disabled}
        evaluationRulesInputHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_RESPONSE_PARAMETER_CONTAINER_HEIGHT}
        responseParameterArrayInputHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_RESPONSE_PARAMETER_ARRAY_INPUT_HEIGHT}
        responseParameterInputHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_RESPONSE_PARAMETER_INPUT_HEIGHT}
      />
      <InfoText errorMessage={error} />
    </div>
  );
}

EndpointResponseEvaluationRulesInput.propTypes = {
  fieldName: PropTypes.string,
  evaluationRuleFieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
};

export default EndpointResponseEvaluationRulesInput;
