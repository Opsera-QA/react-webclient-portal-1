import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function MockPipelineStepConfigurationSummaryPanel({ mockPipelineDataObject, pipelineData, setActiveTab }) {

  if (mockPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col>
          <DtoTextField dataObject={mockPipelineDataObject} fieldName={"mockTextOne"}/>
        </Col>
        <Col>
          <DtoTextField dataObject={mockPipelineDataObject} fieldName={"mockTextTwo"}/>
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
