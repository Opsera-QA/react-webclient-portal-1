import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import ExternalApiRestIntegrationStepSummaryVerticalTabContainer
  from "components/workflow/plan/step/external_rest_api_integration/step_summary/ExternalApiRestIntegrationStepSummaryVerticalTabContainer";

function ExternalRestApiIntegrationStepSummaryPanel({ pipelineData, externalRestApiIntegrationModel, setActiveTab }) {
  const getBody = () => {
    return (
      <Row>
        <Col lg={12}>
          <ToolNameField
            model={externalRestApiIntegrationModel}
            fieldName={"toolId"}
          />
        </Col>
        <Col lg={12}>
          <ExternalApiRestIntegrationStepSummaryVerticalTabContainer
            externalRestApiIntegrationModel={externalRestApiIntegrationModel}
          />
        </Col>
      </Row>
    );
  };

  if (externalRestApiIntegrationModel == null) {
    return null;
  }

  if (pipelineData == null) {
    return (
      getBody()
    );
  }

  return (
    <PipelineStepSummaryPanelContainer
      setActiveTab={setActiveTab}
      pipelineData={externalRestApiIntegrationModel}
    >
      {getBody()}
    </PipelineStepSummaryPanelContainer>
  );
}

ExternalRestApiIntegrationStepSummaryPanel.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ExternalRestApiIntegrationStepSummaryPanel;
