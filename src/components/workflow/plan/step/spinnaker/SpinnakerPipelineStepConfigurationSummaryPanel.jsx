import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SpinnakerPipelineStepConfigurationSummaryPanel({ spinnakerPipelineDataObject, pipelineData, setActiveTab }) {

  if (spinnakerPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={spinnakerPipelineDataObject} fieldName={"spinnakerId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={spinnakerPipelineDataObject} fieldName={"toolURL"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={spinnakerPipelineDataObject} fieldName={"applicationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={spinnakerPipelineDataObject} fieldName={"pipelineName"}/>
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
