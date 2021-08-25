import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function XUnitPipelineStepConfigurationSummaryPanel({ xunitPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={xunitPipelineStepData} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"workspaceName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"gitBranch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"dockerName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={xunitPipelineStepData} fieldName={"dockerTagName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

XUnitPipelineStepConfigurationSummaryPanel.propTypes = {
  xunitPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default XUnitPipelineStepConfigurationSummaryPanel;
