import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function PmdScanPipelineStepConfigurationSummaryPanel({ pmdScanPipelineDataObject, pipelineData, setActiveTab }) {
  if (pmdScanPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={pmdScanPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pmdScanPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={pmdScanPipelineDataObject} fieldName={"type"}/>
        </Col>
        {/* <Col lg={6}>
          <TextFieldBase dataObject={pmdScanPipelineDataObject} fieldName={"gitToolId"}/>
        </Col> */}
        <Col lg={6}>
          <JsonField dataObject={pmdScanPipelineDataObject} fieldName={"qualityGate"} />
        </Col>
        {/* <Col lg={6}>
          <JsonField dataObject={pmdScanPipelineDataObject} fieldName={"dependencies"} />
        </Col> */}
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

PmdScanPipelineStepConfigurationSummaryPanel.propTypes = {
  pmdScanPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PmdScanPipelineStepConfigurationSummaryPanel;
