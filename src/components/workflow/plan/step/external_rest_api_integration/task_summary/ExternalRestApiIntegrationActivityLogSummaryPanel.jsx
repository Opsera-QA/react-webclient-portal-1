import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import ExternalRestApiIntegrationEndpointSummary
  , {
  EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES,
} from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointSummary";
import pipelineActivityLogActionConstants
  from "@opsera/definitions/constants/pipelines/logs/pipelineActivityLogAction.constants";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary";
import StandaloneDateFieldBase from "components/common/fields/date/StandaloneDateFieldBase";
import ExternalRestApiIntegrationStatusCheckEndpointsSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationStatusCheckEndpointsSummary";

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

    if (action === pipelineActivityLogActionConstants.PIPELINE_ACTIVITY_LOG_ACTIONS.OPERATION_LOG) {
      const runRequestConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.connectionCheckEndpoint");
      const runRequestHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.headerTokenEndpoint");
      const runRequestStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.statusCheckEndpoint");
      const runRequestCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.runTriggerEndpoint");

      return (
        <>
          <ExternalRestApiIntegrationStatusCheckEndpointsSummary
            externalRestApiIntegrationStepTaskModel={externalRestApiIntegrationStepTaskModel}
          />
          <div className={"my-3"} />
          <H5FieldSubHeader subheaderText={"Call Operation"} />
          <ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary
            requestType={"Call Operation"}
            endpoint={runRequestConnectionCheckEndpoint}
          />
          <ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary
            requestType={"Call Operation"}
            endpoint={runRequestHeaderTokenEndpoint}
          />
          <StandaloneJsonField
            titleText={"Call Operation Call Operation Endpoint"}
            json={runRequestCallOperationEndpoint}
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
