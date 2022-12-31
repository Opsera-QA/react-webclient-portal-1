import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "../../../../../../../common/fields/boolean/BooleanField";

function AzureWebappsStepConfigurationSummaryPanel({ azureWebappsPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureWebappsPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"deploymentType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"azureToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"azureCredentialId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"resourceGroupName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"webappName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"artifactStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureWebappsStepConfigurationSummaryPanel.propTypes = {
  azureWebappsPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureWebappsStepConfigurationSummaryPanel;
