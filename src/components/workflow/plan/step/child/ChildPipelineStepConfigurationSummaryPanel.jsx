import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import PipelineSummaryField from "components/common/fields/pipelines/PipelineSummaryField";

function ChildPipelineStepConfigurationSummaryPanel({ childPipelineDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <PipelineSummaryField model={childPipelineDataObject} fieldName={"pipelineId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ChildPipelineStepConfigurationSummaryPanel.propTypes = {
  childPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ChildPipelineStepConfigurationSummaryPanel;
