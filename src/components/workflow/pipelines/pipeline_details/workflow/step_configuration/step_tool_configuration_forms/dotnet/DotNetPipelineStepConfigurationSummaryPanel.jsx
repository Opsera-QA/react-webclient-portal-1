import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function DotNetPipelineStepConfigurationSummaryPanel({ dotNetPipelineDataObject, pipelineData, setActiveTab }) {

  if (dotNetPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"scriptFileName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"outputPath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"outputFileName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"solutionFilePath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetPipelineDataObject} fieldName={"solutionFileName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

DotNetPipelineStepConfigurationSummaryPanel.propTypes = {
  dotNetPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default DotNetPipelineStepConfigurationSummaryPanel;
