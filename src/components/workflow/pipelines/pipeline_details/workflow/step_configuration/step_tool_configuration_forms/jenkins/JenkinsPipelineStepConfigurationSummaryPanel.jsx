import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import JsonField from "components/common/fields/json/JsonField";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function JenkinsPipelineStepConfigurationSummaryPanel({ jenkinsPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={jenkinsPipelineStepData} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"rollbackBranchName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"stepIdXML"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"dockerName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"dockerTagName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={jenkinsPipelineStepData} fieldName={"dockerPath"} />
        </Col>
        <Col lg={6}>
          <JsonField dataObject={jenkinsPipelineStepData} fieldName={"buildArgs"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

JenkinsPipelineStepConfigurationSummaryPanel.propTypes = {
  jenkinsPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default JenkinsPipelineStepConfigurationSummaryPanel;
