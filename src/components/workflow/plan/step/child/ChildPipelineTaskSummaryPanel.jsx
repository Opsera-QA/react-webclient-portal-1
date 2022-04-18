import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ChildPipelineTaskSummariesField from "components/workflow/plan/step/child/child-pipelines/ChildPipelineTaskSummariesField";
import PipelineTaskSummaryMessageField
  from "components/common/fields/pipelines/activity/PipelineTaskSummaryMessageField";
import PipelineTaskStateField from "components/common/fields/workflow/pipelines/PipelineTaskStateField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import UserNameField from "components/common/fields/user/UserNameField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function ChildPipelineTaskSummaryPanel({ pipelineTaskData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <H5FieldSubHeader subheaderText={"Step Activity Log Summary:"} />
        </Col>
        <Col md={12}>
          <UserNameField model={pipelineTaskData} fieldName={"user_id"} />
        </Col>
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
        <Col md={6}>
          <DateTimeField dataObject={pipelineTaskData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <PipelineTaskStateField dataObject={pipelineTaskData} fieldName={"status"}/>
        </Col>
        <Col md={12}>
          <PipelineTaskSummaryMessageField fieldName={"api_response.apiResponse.message.message"} dataObject={pipelineTaskData} />
        </Col>
        <Col md={12} className={"py-2"}>
          <H5FieldSubHeader subheaderText={"Child Pipeline Orchestrated by this Step:"} />
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
