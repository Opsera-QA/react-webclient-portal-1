import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationEndpointsOrchestrationSummary(
  {
    endpoints,
    className,
  }) {
  const parsedEndpoints = DataParsingHelper.parseObject(endpoints);
  const runRequestConnectionCheckEndpoint = DataParsingHelper.parseNestedObject(endpoints, "connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = DataParsingHelper.parseNestedObject(endpoints, "headerTokenEndpoint");
  const statusCheckEndpoint = DataParsingHelper.parseNestedObject(endpoints, "statusCheckEndpoint");
  const runRequestRuleEvaluation = DataParsingHelper.parseNestedObject(endpoints, "ruleEvaluation");
  const runRequestCallOperationEndpoint = DataParsingHelper.parseNestedObject(endpoints, "runTriggerEndpoint");

  if (parsedEndpoints == null) {
    return null;
  }

  return (
    <div className={className}>
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={runRequestRuleEvaluation}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
        endpointType={"Call Operation"}
        endpoint={runRequestCallOperationEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
        endpointType={"Status Check"}
        endpoint={runRequestCallOperationEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
        endpoint={runRequestHeaderTokenEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
        endpoint={runRequestConnectionCheckEndpoint}
        className={"mt-2"}
      />
    </div>
  );
}

ExternalRestApiIntegrationEndpointsOrchestrationSummary.propTypes = {
  endpoints: PropTypes.object,
  className: PropTypes.string,
};
