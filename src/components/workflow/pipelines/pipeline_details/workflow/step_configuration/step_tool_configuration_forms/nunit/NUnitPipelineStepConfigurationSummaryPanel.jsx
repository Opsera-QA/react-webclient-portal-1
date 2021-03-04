import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function NUnitPipelineStepConfigurationSummaryPanel({ nunitPipelineDataObject, pipelineData, setActiveTab }) {
  if (nunitPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"solutionFilePath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"solutionFileName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"dllFilePath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nunitPipelineDataObject} fieldName={"dllFileName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

NUnitPipelineStepConfigurationSummaryPanel.propTypes = {
  nunitPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default NUnitPipelineStepConfigurationSummaryPanel;
