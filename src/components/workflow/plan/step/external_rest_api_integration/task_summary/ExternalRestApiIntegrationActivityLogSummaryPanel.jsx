import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import ExternalRestApiIntegrationEndpointSummary from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointSummary";
import pipelineActivityLogActionConstants
  from "@opsera/definitions/constants/pipelines/logs/pipelineActivityLogAction.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel";
import ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationActivityLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
    endpoint,
    endpoints,
  }) {
  const getEndpointFields = () => {
    const parsedEndpoints = DataParsingHelper.parseObject(endpoints);

    if (parsedEndpoints) {
      return (
        <ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary
          endpoints={endpoints}
        />
      );
    }


    if (endpoint) {
      return (
        <ExternalRestApiIntegrationEndpointSummary
          endpoint={endpoint}
        />
      );
    }
  };

  const getBody = () => {
    const action = externalRestApiIntegrationStepTaskModel?.getData("action");

    if (action === pipelineActivityLogActionConstants.PIPELINE_ACTIVITY_LOG_ACTIONS.OPERATION_LOG) {
      return (
        <ExternalRestApiIntegrationActivityLogOperationLogSummaryPanel
          externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
        />
      );
    }

    return getEndpointFields();
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      <Col xs={12}>
        {getBody()}
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

ExternalRestApiIntegrationActivityLogSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  endpoint: PropTypes.object,
  endpoints: PropTypes.object,
};


export default ExternalRestApiIntegrationActivityLogSummaryPanel;
