import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";

export default function ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary(
  {
    endpoint,
    className,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);
  const status = DataParsingHelper.parseNestedString(parsedEndpoint, "ruleEvaluation.status");

  if (parsedEndpoint == null) {
    return null;
  }

  return (
    <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
      className={className}
      endpoint={endpoint}
      endpointType={"Connection Validation"}
      isCollapsed={status === "success"}
    />
  );
}

ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary.propTypes = {
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
