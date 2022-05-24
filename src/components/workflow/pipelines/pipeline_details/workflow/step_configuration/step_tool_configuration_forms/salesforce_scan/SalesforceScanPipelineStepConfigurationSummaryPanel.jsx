import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function SalesforceScanPipelineStepConfigurationSummaryPanel({ salesforceScanPipelineDataObject, pipelineData, setActiveTab }) {
  if (salesforceScanPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceScanPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceScanPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceScanPipelineDataObject} fieldName={"type"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SalesforceScanPipelineStepConfigurationSummaryPanel.propTypes = {
  salesforceScanPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SalesforceScanPipelineStepConfigurationSummaryPanel;
