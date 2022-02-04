import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineTaskStateField from "components/common/fields/workflow/pipelines/PipelineTaskStateField";
import PipelineTaskSummaryMessageField
  from "components/common/fields/pipelines/activity/PipelineTaskSummaryMessageField";
import DateTimeField from "components/common/fields/date/DateTimeField";

function TaskActivitySummaryPanel({ taskActivityLogModel }) {

  if (taskActivityLogModel == null) {
    return null;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={taskActivityLogModel} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={taskActivityLogModel} fieldName={"type"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={taskActivityLogModel} fieldName={"task_id"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={taskActivityLogModel} fieldName={"run_count"}/>
        </Col>
        <Col md={6}>
          <DateTimeField dataObject={taskActivityLogModel} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <PipelineTaskStateField dataObject={taskActivityLogModel} fieldName={"status"}/>
        </Col>
        <Col md={12}>
          <PipelineTaskSummaryMessageField fieldName={"message"} dataObject={taskActivityLogModel} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TaskActivitySummaryPanel.propTypes = {
  taskActivityLogModel: PropTypes.object,
};

export default TaskActivitySummaryPanel;
