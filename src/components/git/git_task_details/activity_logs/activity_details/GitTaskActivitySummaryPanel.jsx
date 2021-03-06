import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineTaskStateField from "components/common/fields/workflow/pipelines/PipelineTaskStateField";
import PipelineTaskSummaryMessageField
  from "components/common/form_fields/pipelines/activity/PipelineTaskSummaryMessageField";
import DateTimeField from "components/common/fields/date/DateTimeField";

function GitTaskActivitySummaryPanel({ gitTaskActivityData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={gitTaskActivityData} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTaskActivityData} fieldName={"type"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTaskActivityData} fieldName={"task_id"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTaskActivityData} fieldName={"run_count"}/>
        </Col>
        <Col md={6}>
          <DateTimeField dataObject={gitTaskActivityData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <PipelineTaskStateField dataObject={gitTaskActivityData} fieldName={"status"}/>
        </Col>
        <Col md={12}>
          <PipelineTaskSummaryMessageField fieldName={"message"} dataObject={gitTaskActivityData} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

GitTaskActivitySummaryPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default GitTaskActivitySummaryPanel;
