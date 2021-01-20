import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function SpinnakerPipelineStepConfigurationSummaryPanel({ spinnakerPipelineDataObject, pipelineData, setActiveTab }) {

  if (spinnakerPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={spinnakerPipelineDataObject} fieldName={"spinnakerId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={spinnakerPipelineDataObject} fieldName={"toolURL"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={spinnakerPipelineDataObject} fieldName={"applicationName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={spinnakerPipelineDataObject} fieldName={"pipelineName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SpinnakerPipelineStepConfigurationSummaryPanel.propTypes = {
  spinnakerPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SpinnakerPipelineStepConfigurationSummaryPanel;
