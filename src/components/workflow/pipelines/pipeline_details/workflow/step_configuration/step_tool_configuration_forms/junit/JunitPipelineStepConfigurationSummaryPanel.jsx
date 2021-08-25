import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function JunitPipelineStepConfigurationSummaryPanel({ junitPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={junitPipelineStepData} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"workspaceName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"dockerName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={junitPipelineStepData} fieldName={"dockerTagName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

JunitPipelineStepConfigurationSummaryPanel.propTypes = {
  junitPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default JunitPipelineStepConfigurationSummaryPanel;
