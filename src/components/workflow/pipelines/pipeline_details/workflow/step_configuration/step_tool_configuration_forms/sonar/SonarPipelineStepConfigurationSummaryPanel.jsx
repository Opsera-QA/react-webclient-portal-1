import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function SonarPipelineStepConfigurationSummaryPanel({ sonarPushDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"sonarToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"branch"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sonarPushDataObject} fieldName={"sonarSourcePath"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SonarPipelineStepConfigurationSummaryPanel.propTypes = {
  sonarPushDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SonarPipelineStepConfigurationSummaryPanel;
