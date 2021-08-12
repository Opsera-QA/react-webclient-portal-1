import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanField from "components/common/fields/boolean/BooleanField";

import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function AzureAcrPushPipelineStepConfigurationSummary({ azureAcrPushPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureAcrPushPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"azureToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"buildStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"azureRegistryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"resource"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={azureAcrPushPipelineDataObject} fieldName={"newRepo"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureAcrPushPipelineDataObject} fieldName={"azureRepoName"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={azureAcrPushPipelineDataObject} fieldName={"useRunCount"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureAcrPushPipelineStepConfigurationSummary.propTypes = {
  azureAcrPushPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureAcrPushPipelineStepConfigurationSummary;
