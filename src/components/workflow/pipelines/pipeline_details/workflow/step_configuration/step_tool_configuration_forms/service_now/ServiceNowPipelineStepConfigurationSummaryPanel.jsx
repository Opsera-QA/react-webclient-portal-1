import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ServiceNowPipelineStepConfigurationSummaryPanel({ serviceNowPipelineDataObject, pipelineData, setActiveTab }) {

  if (serviceNowPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"message"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"contact"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ServiceNowPipelineStepConfigurationSummaryPanel.propTypes = {
  serviceNowPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ServiceNowPipelineStepConfigurationSummaryPanel;
