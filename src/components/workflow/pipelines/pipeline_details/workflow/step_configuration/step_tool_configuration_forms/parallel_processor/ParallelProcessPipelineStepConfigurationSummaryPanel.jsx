import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import PipelineSummariesField from "components/common/form_fields/pipelines/PipelineSummariesField";

function ParallelProcessPipelineStepConfigurationSummaryPanel({ parallelPipelineDataObject, pipelineData, setActiveTab }) {

  if (parallelPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <PipelineSummariesField dataObject={parallelPipelineDataObject} fieldName={"pipelines"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ParallelProcessPipelineStepConfigurationSummaryPanel.propTypes = {
  parallelPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ParallelProcessPipelineStepConfigurationSummaryPanel;
