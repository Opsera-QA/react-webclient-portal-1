import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function HelmPipelineStepConfigurationSummaryPanel({ terraformPipelineDataObject, pipelineData, setActiveTab }) {
  if (terraformPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={terraformPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={terraformPipelineDataObject} fieldName={"keyValueMap"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

HelmPipelineStepConfigurationSummaryPanel.propTypes = {
  terraformPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default HelmPipelineStepConfigurationSummaryPanel;
