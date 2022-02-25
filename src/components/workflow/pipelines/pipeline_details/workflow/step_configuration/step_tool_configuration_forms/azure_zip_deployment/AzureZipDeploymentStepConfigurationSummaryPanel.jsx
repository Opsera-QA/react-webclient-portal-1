import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function AzureZipDeploymentStepConfigurationSummaryPanel({ azureFunctionsPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureFunctionsPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField dataObject={azureFunctionsPipelineDataObject} fieldName={"azureToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"stepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"azureCredentialId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"azureStorageAccountName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureZipDeploymentStepConfigurationSummaryPanel.propTypes = {
  azureFunctionsPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureZipDeploymentStepConfigurationSummaryPanel;