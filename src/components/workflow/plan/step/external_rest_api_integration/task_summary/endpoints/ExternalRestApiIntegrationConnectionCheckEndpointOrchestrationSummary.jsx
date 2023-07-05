import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";

export default function ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary(
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
      endpoint={endpoint}
      endpointType={"Connection Validation"}
    />
  );
}

ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary.propTypes = {
  requestType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
