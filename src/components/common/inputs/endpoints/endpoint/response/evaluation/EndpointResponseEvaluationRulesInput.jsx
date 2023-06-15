import React, {useEffect} from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import EndpointResponseEvaluationRulesInputBase
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInputBase";
import {
  EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.heights";
import useGetExternalApiIntegratorEndpointById
  from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpointById";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

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
  const {
    endpoint,
    isLoading,
    error,
  } = useGetExternalApiIntegratorEndpointById(
    toolId,
    endpointId,
  );

  useEffect(() => {}, [toolId, endpointId, fieldName]);

  if (DataParsingHelper.isMongoDbId(endpointId) !== true) {
    return (
      <CenteredContentWrapper>
        <div className={"my-5"}>
          An External API Integrator Tool and Endpoint must be selected before you can configure evaluation rules.
        </div>
      </CenteredContentWrapper>
    );
  }

  if (isLoading) {
    return (
      <CenterLoadingIndicator
        minHeight={EXTERNAL_REST_API_INTEGRATION_STEP_HEIGHTS.ENDPOINT_RESPONSE_PARAMETER_CONTAINER_HEIGHT}
      />
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
