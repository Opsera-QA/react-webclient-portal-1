import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SnykPipelineStepConfigurationSummary({ snykPipelineDataObject, pipelineData, setActiveTab }) {
  if (snykPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={snykPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snykPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={snykPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snykPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snykPipelineDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={snykPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SnykPipelineStepConfigurationSummary.propTypes = {
  snykPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SnykPipelineStepConfigurationSummary;
