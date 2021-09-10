import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "../../../../../../../common/fields/boolean/BooleanField";

function AzureFunctionsStepConfigurationSummaryPanel({ azureFunctionsPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureFunctionsPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"azureRegion"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"applicationType"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={azureFunctionsPipelineDataObject} fieldName={"dynamicServiceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureFunctionsPipelineDataObject} fieldName={"namePretext"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureFunctionsStepConfigurationSummaryPanel.propTypes = {
  azureFunctionsPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureFunctionsStepConfigurationSummaryPanel;