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
import UserNameField from "components/common/fields/user/UserNameField";

function PipelineTaskSummaryPanelBase(
  {
    pipelineTaskData,
    messageFieldName,
    children,
  }) {
  return (
    <SummaryPanelContainer className={"mx-2"}>
      <Row>
        <Col md={12}>
          <UserNameField model={pipelineTaskData} fieldName={"user_id"}/>
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
          <PipelineTaskSummaryMessageField
            fieldName={messageFieldName}
            model={pipelineTaskData}
          />
        </Col>
        {children}
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskSummaryPanelBase.propTypes = {
  pipelineTaskData: PropTypes.object,
  children: PropTypes.any,
  messageFieldName: PropTypes.string,
};

PipelineTaskSummaryPanelBase.defaultProps = {
  messageFieldName: "message",
};

export default PipelineTaskSummaryPanelBase;
