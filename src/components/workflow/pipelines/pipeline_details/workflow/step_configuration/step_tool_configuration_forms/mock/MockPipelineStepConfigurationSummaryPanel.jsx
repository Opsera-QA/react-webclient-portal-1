import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function MockPipelineStepConfigurationSummaryPanel({ mockPipelineDataObject, pipelineData, setActiveTab }) {

  if (mockPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col>
          <TextFieldBase dataObject={mockPipelineDataObject} fieldName={"mockTextOne"}/>
        </Col>
        <Col>
          <TextFieldBase dataObject={mockPipelineDataObject} fieldName={"mockTextTwo"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

MockPipelineStepConfigurationSummaryPanel.propTypes = {
  mockPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default MockPipelineStepConfigurationSummaryPanel;
