import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

export default function PackerPipelineStepConfigurationSummaryPanel(
  {
    packerStepModel,
    pipelineData,
    setActiveTab,
  }) {
  if (packerStepModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={packerStepModel} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={packerStepModel} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerStepModel} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerStepModel} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerStepModel} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerStepModel} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={packerStepModel} fieldName={"keyValueMap"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

PackerPipelineStepConfigurationSummaryPanel.propTypes = {
  packerStepModel: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};