import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeField from "components/common/form_fields/DateTimeField";
import ParallelPipelineTaskSummariesField from "./parallel_pipeline/ParallelPipelineTaskSummariesField";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineTaskSummaryMessageField
  from "components/common/form_fields/pipelines/activity/PipelineTaskSummaryMessageField";
import PipelineTaskStateField from "components/common/form_fields/pipelines/PipelineTaskStateField";

function ParallelProcessorPipelineTaskSummaryPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12} className="px-1">
          <h6>Step Activity Log Summary:</h6>
        </Col>
        <Col md={6} className="p-1">
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"step_name"}/>
        </Col>
        <Col md={6} className="p-1">
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"tool_identifier"}/>
        </Col>
        <Col md={6} className="p-1">
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"action"}/>
        </Col>
        <Col md={6} className="p-1">
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"run_count"}/>
        </Col>
        <Col md={6} className="p-1">
          <DateTimeField dataObject={pipelineTaskData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6} className="p-1">
          <PipelineTaskStateField dataObject={pipelineTaskData} fieldName={"status"}/>
        </Col>
        <Col md={12} className="px-1">
          <PipelineTaskSummaryMessageField fieldName={"api_response.apiResponse.message.message"} dataObject={pipelineTaskData} />
        </Col>
        <Col md={12} className="px-1 py-2">
          <h6>Pipelines Orchestrated by this Step:</h6>
          <ParallelPipelineTaskSummariesField dataObject={pipelineTaskData}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ParallelProcessorPipelineTaskSummaryPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
  runCount: PropTypes.string,
};


export default ParallelProcessorPipelineTaskSummaryPanel;
