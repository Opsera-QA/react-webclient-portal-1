import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ApprovalGatePipelineStepConfigurationSummaryPanel({ approvalGatePipelineDataObject, pipelineData, setActiveTab }) {

  if (approvalGatePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={approvalGatePipelineDataObject} fieldName={"message"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={approvalGatePipelineDataObject} fieldName={"contact"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ApprovalGatePipelineStepConfigurationSummaryPanel.propTypes = {
  approvalGatePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ApprovalGatePipelineStepConfigurationSummaryPanel;
