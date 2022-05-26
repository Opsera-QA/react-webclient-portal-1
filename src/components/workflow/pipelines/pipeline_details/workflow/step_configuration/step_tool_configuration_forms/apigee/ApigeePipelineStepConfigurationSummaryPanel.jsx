import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function ApigeePipelineStepConfigurationSummaryPanel({ apigeePipelineDataObject, pipelineData, setActiveTab }) {
  if (apigeePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={apigeePipelineDataObject} fieldName={"type"}/>
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={apigeePipelineDataObject} fieldName={"targetToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={apigeePipelineDataObject} fieldName={"environmentName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={apigeePipelineDataObject} fieldName={"delayTime"}/>
        </Col>        
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ApigeePipelineStepConfigurationSummaryPanel.propTypes = {
  apigeePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ApigeePipelineStepConfigurationSummaryPanel;
