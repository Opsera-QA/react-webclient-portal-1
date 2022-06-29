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

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel, endpoint, endpoints }) {
  const getEndpointFields = () => {
    const parsedEndpoints = dataParsingHelper.parseObject(endpoints, false);

    if (parsedEndpoints) {
      const connectionCheckEndpoint = parsedEndpoints?.connectionCheckEndpoint;
      const headerTokenEndpoint = parsedEndpoints?.headerTokenEndpoint;
      const statusCheckEndpoint = parsedEndpoints?.statusCheckEndpoint;
      const callOperationEndpoint = parsedEndpoints?.callOperationEndpoint;

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
          requestType={"External"}
        />
      );
    }
  };

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={externalRestApiIntegrationStepTaskModel}>
      <Col xs={12}>
        {getEndpointFields()}
      </Col>
    </PipelineTaskSummaryPanelBase>
  );
}

ExternalRestApiIntegrationTaskSummaryPanel.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  endpoint: PropTypes.object,
  endpoints: PropTypes.object,
};


export default ExternalRestApiIntegrationTaskSummaryPanel;
