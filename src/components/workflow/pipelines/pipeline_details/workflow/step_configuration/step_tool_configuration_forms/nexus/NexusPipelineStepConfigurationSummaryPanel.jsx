import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function NexusPipelineStepConfigurationSummaryPanel({ nexusPipelineDataObject, pipelineData, setActiveTab }) {

  if (nexusPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={nexusPipelineDataObject} fieldName={"groupName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nexusPipelineDataObject} fieldName={"artifactName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nexusPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nexusPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={nexusPipelineDataObject} fieldName={"artifactStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

NexusPipelineStepConfigurationSummaryPanel.propTypes = {
  nexusPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default NexusPipelineStepConfigurationSummaryPanel;
