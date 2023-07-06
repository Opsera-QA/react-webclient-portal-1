import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import StandaloneDateField from "components/common/fields/date/StandaloneDateField";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
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
      <H5FieldSubHeader subheaderText={"Latest Status Check"} />
      <StandaloneDateField
        label={"Latest Status Check Timestamp"}
        date={lastStatusCheckTimestamp}
        dateFormat={DateFormatHelper.DATE_FORMATS.TIMESTAMP}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={statusCheckRuleEvaluation}
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