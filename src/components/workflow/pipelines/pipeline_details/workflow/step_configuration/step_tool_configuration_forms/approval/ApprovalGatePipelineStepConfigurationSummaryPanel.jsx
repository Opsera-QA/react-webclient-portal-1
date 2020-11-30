import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import BooleanField from "../../../../../../../common/form_fields/dto_form_fields/BooleanField";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function ApprovalGatePipelineStepConfigurationSummaryPanel({ approvalGatePipelineDataObject, pipelineData, setActiveTab }) {

  if (approvalGatePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={approvalGatePipelineDataObject} fieldName={"message"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={approvalGatePipelineDataObject} fieldName={"contact"}/>
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
