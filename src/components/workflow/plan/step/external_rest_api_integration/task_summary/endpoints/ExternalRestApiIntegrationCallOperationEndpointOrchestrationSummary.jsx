import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary(
  {
    endpoints,
    className,
  }) {
  const parsedEndpoints = DataParsingHelper.parseObject(endpoints);
  const runRequestConnectionCheckEndpoint = DataParsingHelper.parseNestedObject(endpoints, "connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = DataParsingHelper.parseNestedObject(endpoints, "headerTokenEndpoint");
  const runRequestRuleEvaluation = DataParsingHelper.parseNestedObject(endpoints, "ruleEvaluation");
  const runRequestCallOperationEndpoint = DataParsingHelper.parseNestedObject(endpoints, "runTriggerEndpoint");

  if (parsedEndpoints == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={"Call Operation"} />
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={runRequestRuleEvaluation}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
        endpointType={"Call Operation"}
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

ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary.propTypes = {
  endpoints: PropTypes.object,
  className: PropTypes.string,
};
