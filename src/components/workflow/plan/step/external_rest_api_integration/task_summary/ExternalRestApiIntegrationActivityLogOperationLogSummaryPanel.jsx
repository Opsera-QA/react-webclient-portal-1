import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationActivityLogSummaryPanelBase
from "components/workflow/plan/step/external_rest_api_integration/task_summary/ExternalRestApiIntegrationActivityLogSummaryPanelBase";

export default function ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const statusCheckRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.ruleEvaluation");
  const lastStatusCheckTimestamp = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_timestamp");
  const statusCheckEndpoints = DataParsingHelper.parseObject(externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints"));
  const callOperationEndpoints = DataParsingHelper.parseObject(externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints"));

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <>
      <H5FieldSubHeader
        subheaderText={"Latest Status Check"}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={statusCheckRuleEvaluation}
        latestStatusCheckTime={lastStatusCheckTimestamp}
        className={"my-2"}
      />
      <ExternalRestApiIntegrationActivityLogSummaryPanelBase
        titleText={"Operation Log"}
        callOperationEndpoints={callOperationEndpoints}
        statusCheckEndpoints={statusCheckEndpoints}
      />
    </>
  );
}

ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  callOperationEndpoints: PropTypes.object,
  statusCheckEndpoints: PropTypes.object,
};
