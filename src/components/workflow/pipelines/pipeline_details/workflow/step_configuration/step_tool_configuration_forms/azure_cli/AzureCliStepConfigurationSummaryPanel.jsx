import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function AzureCliStepConfigurationSummaryPanel({ azureCliPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureCliPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"deploymentType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"azureToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"azureCredentialId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"resourceGroupName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"webappName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliPipelineDataObject} fieldName={"artifactStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureCliStepConfigurationSummaryPanel.propTypes = {
  azureCliPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureCliStepConfigurationSummaryPanel;
