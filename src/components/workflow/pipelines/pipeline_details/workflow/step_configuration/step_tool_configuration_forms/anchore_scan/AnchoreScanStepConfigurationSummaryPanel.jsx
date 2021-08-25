import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function AnchoreScanStepConfigurationSummaryPanel({ anchoreDataObject, pipelineData, setActiveTab }) {

  if (anchoreDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={anchoreDataObject} fieldName={"anchoreToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={anchoreDataObject} fieldName={"accountUsername"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={anchoreDataObject} fieldName={"anchoreUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={anchoreDataObject} fieldName={"dockerImageUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={anchoreDataObject} fieldName={"ecrPushStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AnchoreScanStepConfigurationSummaryPanel.propTypes = {
  anchoreDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AnchoreScanStepConfigurationSummaryPanel;
