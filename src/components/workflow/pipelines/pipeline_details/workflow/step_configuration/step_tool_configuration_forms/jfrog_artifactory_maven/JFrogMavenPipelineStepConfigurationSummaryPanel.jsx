import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function JFrogMavenPipelineStepConfigurationSummaryPanel({ jFrogPipelineDataObject, pipelineData, setActiveTab }) {
  if (jFrogPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField dataObject={jFrogPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"jobType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"jobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"toolJobId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"buildStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"jfrogToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jFrogPipelineDataObject} fieldName={"jobDescription"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

JFrogMavenPipelineStepConfigurationSummaryPanel.propTypes = {
  jFrogPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default JFrogMavenPipelineStepConfigurationSummaryPanel;
