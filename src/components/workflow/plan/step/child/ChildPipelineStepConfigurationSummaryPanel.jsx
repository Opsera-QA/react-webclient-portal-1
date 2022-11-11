import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import PipelineSummaryField from "components/common/fields/pipelines/PipelineSummaryField";

export default function ChildPipelineStepConfigurationSummaryPanel(
  {
    childPipelineModel,
    pipelineModel,
    setActiveTab,
  }) {
  return (
    <PipelineStepSummaryPanelContainer
      setActiveTab={setActiveTab}
      pipelineData={pipelineModel}
    >
      <Row>
        <Col lg={12}>
          <PipelineSummaryField
            model={childPipelineModel}
            pipelineId={childPipelineModel?.getData("pipelineId")}
            fieldName={"pipelineId"}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ChildPipelineStepConfigurationSummaryPanel.propTypes = {
  childPipelineModel: PropTypes.object,
  pipelineModel: PropTypes.object,
  setActiveTab: PropTypes.func
};