import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationActivityLogSummaryPanelBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/ExternalRestApiIntegrationActivityLogSummaryPanelBase";

export default function ExternalRestApiIntegrationActivityLogStatusCheckSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const statusCheckEndpoints = externalRestApiIntegrationStepTaskModel?.getData("api_response.apiResponse.endpoints");


  if (externalRestApiIntegrationStepTaskModel == null || statusCheckEndpoints == null) {
    return null;
  }

  return (
    <ExternalRestApiIntegrationActivityLogSummaryPanelBase
      titleText={"Status Check Log"}
      statusCheckEndpoints={statusCheckEndpoints}
    />
  );
}

ExternalRestApiIntegrationActivityLogStatusCheckSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};
