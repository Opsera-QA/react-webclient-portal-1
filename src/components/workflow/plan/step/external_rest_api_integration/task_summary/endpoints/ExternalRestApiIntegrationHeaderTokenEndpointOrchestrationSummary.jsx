import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary(
  {
    endpoint,
    requestType,
    className,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);

  if (parsedEndpoint == null) {
    return null;
  }

  return (
    <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
      className={className}
      requestType={requestType}
      endpointType={"Access Token Generation"}
      endpoint={parsedEndpoint}
    >
      <div>Header test</div>
    </ExternalRestApiIntegrationEndpointOrchestrationSummaryBase>
  );
}

ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary.propTypes = {
  requestType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
