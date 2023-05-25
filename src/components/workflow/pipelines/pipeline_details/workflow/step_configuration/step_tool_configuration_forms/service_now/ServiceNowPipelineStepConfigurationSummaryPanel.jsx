import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "components/common/fields/boolean/BooleanField";

function ServiceNowPipelineStepConfigurationSummaryPanel({ serviceNowPipelineDataObject, pipelineData, setActiveTab }) {

  if (serviceNowPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={serviceNowPipelineDataObject} fieldName={"serviceNowToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={serviceNowPipelineDataObject} fieldName={"existingChangeRequest"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestNumber"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestShortDescription"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestApproval"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestStartDate"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestEndDate"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestState"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"assignmentGroupName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={serviceNowPipelineDataObject} fieldName={"changeRequestDescription"}/>
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
