import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "../../../../common/form_fields/TextFieldBase";
import DateTimeField from "../../../../common/form_fields/DateTimeField";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import PipelineStateField from "../../../../common/form_fields/pipelines/state/PipelineStateField";

function PipelineTaskSummaryPanelBase({ pipelineTaskData }) {
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
        <Col md={6}>
          <DateTimeField dataObject={pipelineTaskData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <PipelineStateField dataObject={pipelineTaskData} fieldName={"state"}/>
        </Col>
        <Col md={12}>
          <TextFieldBase dataObject={pipelineTaskData} fieldName={"message"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineTaskSummaryPanelBase.propTypes = {
  pipelineTaskData: PropTypes.object,
};


export default PipelineTaskSummaryPanelBase;
