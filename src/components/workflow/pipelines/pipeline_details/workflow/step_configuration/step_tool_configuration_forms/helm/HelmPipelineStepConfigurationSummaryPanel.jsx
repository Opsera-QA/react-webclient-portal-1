import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function HelmPipelineStepConfigurationSummaryPanel({ helmPipelineDataObject, pipelineData, setActiveTab }) {
  if (helmPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={helmPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={helmPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={helmPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={helmPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={helmPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={helmPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={helmPipelineDataObject} fieldName={"keyValueMap"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

HelmPipelineStepConfigurationSummaryPanel.propTypes = {
  helmPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default HelmPipelineStepConfigurationSummaryPanel;
