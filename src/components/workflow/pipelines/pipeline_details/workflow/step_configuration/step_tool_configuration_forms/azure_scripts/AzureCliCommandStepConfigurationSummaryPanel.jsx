import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "../../../../../../../common/fields/boolean/BooleanField";

function AzureCliCommandStepConfigurationSummaryPanel({ azureCliCommandPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureCliCommandPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliCommandPipelineDataObject} fieldName={"inlineCommand"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliCommandPipelineDataObject} fieldName={"filePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureCliCommandPipelineDataObject} fieldName={"fileName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureCliCommandStepConfigurationSummaryPanel.propTypes = {
  azureCliCommandPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureCliCommandStepConfigurationSummaryPanel;