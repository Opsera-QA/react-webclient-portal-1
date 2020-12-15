import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateTimeField from "../../../../../../../common/form_fields/DateTimeField";
import TextFieldBase from "../../../../../../../common/form_fields/TextFieldBase";
import SummaryPanelContainer from "../../../../../../../common/panels/detail_view/SummaryPanelContainer";
import PipelineStateField from "../../../../../../../common/form_fields/pipelines/state/PipelineStateField";
import ChildPipelineTaskSummariesField from "./child-pipelines/ChildPipelineTaskSummariesField";
import PipelineTaskSummaryMessageField
  from "../../../../../../../common/form_fields/pipelines/activity/PipelineTaskSummaryMessageField";

function ChildPipelineTaskSummaryPanel({ pipelineTaskData }) {
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
          <PipelineStateField dataObject={pipelineTaskData} fieldName={"state"}/>
        </Col>
        <Col md={12} className="px-1">
          <PipelineTaskSummaryMessageField fieldName={"api_response.apiResponse.message.message"} dataObject={pipelineTaskData} />
        </Col>
        <Col md={12} className="px-1 py-2">
          <h6>Child Pipeline Orchestrated by this Step:</h6>
          <ChildPipelineTaskSummariesField dataObject={pipelineTaskData}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ChildPipelineTaskSummaryPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
  runCount: PropTypes.string,
};


export default ChildPipelineTaskSummaryPanel;
