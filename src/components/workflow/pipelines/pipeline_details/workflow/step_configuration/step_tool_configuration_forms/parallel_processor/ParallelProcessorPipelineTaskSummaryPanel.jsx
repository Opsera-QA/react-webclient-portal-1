import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeField from "../../../../../../../common/form_fields/DateTimeField";
import ParallelPipelineTaskSummariesField from "./parallel_pipeline/ParallelPipelineTaskSummariesField";
import TextFieldBase from "../../../../../../../common/form_fields/TextFieldBase";
import PipelineStatusField from "../../../../../../../common/form_fields/pipelines/status/PipelineStatusField";
import SummaryPanelContainer from "../../../../../../../common/panels/detail_view/SummaryPanelContainer";

function ParallelProcessorPipelineTaskSummaryPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"step_name"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"tool_identifier"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"action"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"run_count"}/>
        </Col>
        <Col md={12}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"api_response.apiResponse.message.message"}/>
        </Col>
        <Col md={6}>
          <DateTimeField dataObject={pipelineTaskData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <PipelineStatusField dataObject={pipelineTaskData} fieldName={"status"}/>
        </Col>
        <Col md={12}>
          <ParallelPipelineTaskSummariesField dataObject={pipelineTaskData}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ParallelProcessorPipelineTaskSummaryPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
  runCount: PropTypes.string
};


export default ParallelProcessorPipelineTaskSummaryPanel;
