import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function TwistlockPipelineStepConfigurationSummaryPanel({ twistlockPipelineDataObject, pipelineData, setActiveTab }) {
  if (twistlockPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={twistlockPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={twistlockPipelineDataObject} fieldName={"twistlockToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={twistlockPipelineDataObject} fieldName={"buildStepId"}/>
        </Col>        
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TwistlockPipelineStepConfigurationSummaryPanel.propTypes = {
  twistlockPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TwistlockPipelineStepConfigurationSummaryPanel;
