import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationActivityLogSummaryPanelBase
from "components/workflow/plan/step/external_rest_api_integration/task_summary/ExternalRestApiIntegrationActivityLogSummaryPanelBase";

export default function ExternalRestApiIntegrationActivityLogStartConfirmationSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
  }) {
  const callOperationEndpoints = externalRestApiIntegrationStepTaskModel?.getData("api_response.endpoints");

  if (externalRestApiIntegrationStepTaskModel == null || callOperationEndpoints == null) {
    return null;
  }

  return (
    <ExternalRestApiIntegrationActivityLogSummaryPanelBase
      titleText={"Call Operation Log"}
      callOperationEndpoints={callOperationEndpoints}
    />
  );
}

ExternalRestApiIntegrationActivityLogStartConfirmationSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
};
