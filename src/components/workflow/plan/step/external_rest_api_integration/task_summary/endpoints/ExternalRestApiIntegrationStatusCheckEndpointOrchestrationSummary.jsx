import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";

export default function ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary(
  {
    externalRestApiIntegrationStepTaskModel,
    className,
  }) {
  const statusCheckRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.ruleEvaluation");
  const lastStatusCheckTimestamp = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_timestamp");
  const statusCheckConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.connectionCheckEndpoint");
  const statusCheckHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.headerTokenEndpoint");
  const statusCheckStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.statusCheckEndpoint");

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={statusCheckRuleEvaluation}
        latestStatusCheckTime={lastStatusCheckTimestamp}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
        endpointType={"Status Check"}
        endpoint={statusCheckStatusCheckEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
        endpoint={statusCheckHeaderTokenEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
        endpoint={statusCheckConnectionCheckEndpoint}
        className={"mt-2"}
      />
    </div>
  );
}

ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  className: PropTypes.string,
};
