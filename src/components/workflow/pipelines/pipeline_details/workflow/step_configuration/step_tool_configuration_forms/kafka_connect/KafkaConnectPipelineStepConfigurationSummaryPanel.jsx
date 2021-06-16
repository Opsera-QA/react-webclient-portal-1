import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function KafkaConnectPipelineStepConfigurationSummaryPanel({ kafkaConnectPipelineDataObject, pipelineData, setActiveTab }) {
  if (kafkaConnectPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"kafkaToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"connectorFileName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"connectorFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kafkaConnectPipelineDataObject} fieldName={"kafkaConnectAction"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

KafkaConnectPipelineStepConfigurationSummaryPanel.propTypes = {
  kafkaConnectPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default KafkaConnectPipelineStepConfigurationSummaryPanel;
