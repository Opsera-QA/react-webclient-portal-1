import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import DtoItemField from "../../../../../../../common/form_fields/dto_form_fields/dto-item-field";
import PipelineSummariesField from "../../../../../../../common/form_fields/pipelines/PipelineSummariesField";

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
