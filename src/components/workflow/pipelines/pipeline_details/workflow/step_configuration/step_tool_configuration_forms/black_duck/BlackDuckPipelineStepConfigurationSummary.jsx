import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function BlackDuckPipelineStepConfigurationSummary({ blackDuckPipelineDataObject, pipelineData, setActiveTab }) {
  if (blackDuckPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={blackDuckPipelineDataObject} fieldName={"blackDuckToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={blackDuckPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"projectName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={blackDuckPipelineDataObject} fieldName={"tag"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

BlackDuckPipelineStepConfigurationSummary.propTypes = {
  blackDuckPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default BlackDuckPipelineStepConfigurationSummary;
