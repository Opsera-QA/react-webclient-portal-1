import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationEndpointSummary
  , {
  EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES,
} from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointSummary";
import pipelineActivityLogActionConstants
  from "@opsera/definitions/constants/pipelines/logs/pipelineActivityLogAction.constants";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationActivityLogSummaryPanel(
  {
    externalRestApiIntegrationStepTaskModel,
    endpoint,
    endpoints,
  }) {
  const getEndpointFields = () => {
    const parsedEndpoints = dataParsingHelper.parseObject(endpoints, false);

    if (parsedEndpoints) {
      const connectionCheckEndpoint = parsedEndpoints?.connectionCheckEndpoint;
      const headerTokenEndpoint = parsedEndpoints?.headerTokenEndpoint;
      const statusCheckEndpoint = parsedEndpoints?.statusCheckEndpoint;
      const callOperationEndpoint = parsedEndpoints?.runTriggerEndpoint;

      return (
        <div>
          <ExternalRestApiIntegrationEndpointSummary
            endpoint={connectionCheckEndpoint}
            requestType={EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES.CONNECTION_VALIDATION}
          />
          <ExternalRestApiIntegrationEndpointSummary
            endpoint={headerTokenEndpoint}
            requestType={EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES.HEADER_TOKEN}
          />
          <ExternalRestApiIntegrationEndpointSummary
            endpoint={statusCheckEndpoint}
            requestType={EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES.STATUS_CHECK}
          />
          <ExternalRestApiIntegrationEndpointSummary
            endpoint={callOperationEndpoint}
            requestType={EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES.CALL_OPERATION}
          />
        </div>
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

    // TODO: Write up constant instead of hardcoding string
    if (action === pipelineActivityLogActionConstants.PIPELINE_ACTIVITY_LOG_ACTIONS.OPERATION_LOG) {
      return (
        <>
          <StandaloneJsonField
            titleText={"Call Operation"}
            json={externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request")}
          />
          <StandaloneJsonField
            titleText={"Latest Status Check"}
            json={externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request")}
          />
        </>
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
