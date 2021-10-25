import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function DotNetCliPipelineStepConfigurationSummaryPanel({ dotNetCliPipelineDataObject, pipelineData, setActiveTab }) {

  if (dotNetCliPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"dotnetType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"dotnetSdkVersion"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"outputPath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dotNetCliPipelineDataObject} fieldName={"outputFileName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

DotNetCliPipelineStepConfigurationSummaryPanel.propTypes = {
  dotNetCliPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default DotNetCliPipelineStepConfigurationSummaryPanel;
