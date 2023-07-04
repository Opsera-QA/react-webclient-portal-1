import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

export default function ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary(
  {
    externalRestApiIntegrationStepTaskModel,
    className,
  }) {
  const runRequestConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.headerTokenEndpoint");
  // const runRequestStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.statusCheckEndpoint");
  const runRequestCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.runTriggerEndpoint");

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={"Call Operation"} />
      <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
        requestType={"Call Operation"}
        endpoint={runRequestConnectionCheckEndpoint}
      />
      <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
        requestType={"Call Operation"}
        endpoint={runRequestHeaderTokenEndpoint}
      />
      <StandaloneJsonField
        titleText={"Call Operation Call Operation Endpoint"}
        json={runRequestCallOperationEndpoint}
      />
    </div>
  );
}

ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  className: PropTypes.string,
};
