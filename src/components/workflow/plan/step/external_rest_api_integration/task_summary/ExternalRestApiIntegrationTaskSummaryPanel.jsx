import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import Row from "react-bootstrap/Row";
import ExternalRestApiIntegrationEndpointResponseField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointResponseField";
import ExternalRestApiIntegrationEndpointRequestField
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiIntegrationEndpointRequestField";

// TODO: Make fully fleshed out report.
function ExternalRestApiIntegrationTaskSummaryPanel({ externalRestApiIntegrationStepTaskModel }) {
  const getEndpointFields = () => {
    const data = externalRestApiIntegrationStepTaskModel?.getPersistData();
    const endpoint = pipelineHelpers.parseSummaryLogApiResponseValue(data, "endpoint");

    if (endpoint) {
      return (
        <Row>
          <Col xs={6}>
            <ExternalRestApiIntegrationEndpointRequestField
              endpointObject={endpoint}
            />
          </Col>
          <Col xs={6}>
            <ExternalRestApiIntegrationEndpointResponseField
              responseObject={endpoint?.response}
            />
          </Col>
        </Row>
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
};


export default ExternalRestApiIntegrationTaskSummaryPanel;
