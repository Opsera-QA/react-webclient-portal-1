import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary(
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
      endpointType={"Access Token Generation"}
      endpoint={parsedEndpoint}
      isCollapsed={status === "success"}
    >
      <div>Header test</div>
    </ExternalRestApiIntegrationEndpointOrchestrationSummaryBase>
  );
}

ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary.propTypes = {
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
