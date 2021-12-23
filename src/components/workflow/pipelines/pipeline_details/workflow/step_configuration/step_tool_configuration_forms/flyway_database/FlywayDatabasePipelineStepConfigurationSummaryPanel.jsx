import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function FlywayDatabasePipelineStepConfigurationSummaryPanel({ flywayPipelineDataObject, pipelineData, setActiveTab }) {

  if (flywayPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"baseSchema"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"database"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={flywayPipelineDataObject} fieldName={"warehouse"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

FlywayDatabasePipelineStepConfigurationSummaryPanel.propTypes = {
  flywayPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default FlywayDatabasePipelineStepConfigurationSummaryPanel;
