import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import PipelineThresholdFieldCard from "components/common/fields/pipelines/PipelineThresholdFieldCard";

function TwistlockPipelineStepConfigurationSummaryPanel({ twistlockPipelineDataObject, pipelineData }) {
  if (twistlockPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={twistlockPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={twistlockPipelineDataObject} fieldName={"twistlockToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={twistlockPipelineDataObject} fieldName={"buildStepId"}/>
        </Col>
        <Col lg={6} />
        <Col lg={6}>
          <PipelineThresholdFieldCard model={twistlockPipelineDataObject} fieldName={"threshold_compliance"} />
        </Col>
        <Col lg={6}>
          <PipelineThresholdFieldCard model={twistlockPipelineDataObject} fieldName={"threshold_vulnerability"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TwistlockPipelineStepConfigurationSummaryPanel.propTypes = {
  twistlockPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
};


export default TwistlockPipelineStepConfigurationSummaryPanel;
