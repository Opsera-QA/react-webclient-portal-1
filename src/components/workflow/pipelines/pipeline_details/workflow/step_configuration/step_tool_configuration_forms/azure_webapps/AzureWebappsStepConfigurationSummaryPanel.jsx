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
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"azureRegion"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"applicationType"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={azureWebappsPipelineDataObject} fieldName={"dynamicServiceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureWebappsPipelineDataObject} fieldName={"namePretext"}/>
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
