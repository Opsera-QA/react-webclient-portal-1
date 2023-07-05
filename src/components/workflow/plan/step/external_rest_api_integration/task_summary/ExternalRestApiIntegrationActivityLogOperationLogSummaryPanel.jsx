import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary";

export default function ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <>
      <ExternalRestApiIntegrationStatusCheckEndpointOrchestrationSummary
        externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
      />
      <ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
        externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
      />
    </>
  );
}

ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  endpoint: PropTypes.object,
  endpoints: PropTypes.object,
};
