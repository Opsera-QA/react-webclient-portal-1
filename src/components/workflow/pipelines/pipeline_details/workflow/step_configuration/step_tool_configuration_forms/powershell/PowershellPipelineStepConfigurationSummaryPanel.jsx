import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function PowershellPipelineStepConfigurationSummaryPanel({ powershellPipelineDataObject, pipelineData, setActiveTab }) {
  console.log(powershellPipelineDataObject)
  if (powershellPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"scriptFileName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"workspaceName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={powershellPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

PowershellPipelineStepConfigurationSummaryPanel.propTypes = {
  powershellPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PowershellPipelineStepConfigurationSummaryPanel;
