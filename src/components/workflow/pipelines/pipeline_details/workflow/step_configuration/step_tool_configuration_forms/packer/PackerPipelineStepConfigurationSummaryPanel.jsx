import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function PackerPipelineStepConfigurationSummaryPanel({ packerPipelineDataObject, pipelineData, setActiveTab }) {
  if (packerPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={packerPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={packerPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={packerPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={packerPipelineDataObject} fieldName={"keyValueMap"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

PackerPipelineStepConfigurationSummaryPanel.propTypes = {
  packerPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PackerPipelineStepConfigurationSummaryPanel;
