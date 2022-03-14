import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ExternalRestApiIntegrationStepSummaryPanel({ externalRestApiIntegrationModel, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <TextFieldBase
            model={externalRestApiIntegrationModel}
            fieldName={"endpoint"}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ExternalRestApiIntegrationStepSummaryPanel.propTypes = {
  externalRestApiIntegrationModel: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ExternalRestApiIntegrationStepSummaryPanel;
