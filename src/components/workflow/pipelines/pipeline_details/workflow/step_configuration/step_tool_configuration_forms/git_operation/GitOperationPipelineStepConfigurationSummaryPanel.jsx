import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "../../../../../../../common/fields/inventory/ToolNameField";

function GitOperationPipelineStepConfigurationSummaryPanel({ gitOperationPipelineDataObject, pipelineData, setActiveTab }) {
  if (gitOperationPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={gitOperationPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={gitOperationPipelineDataObject} fieldName={"gitToolId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitOperationPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitOperationPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitOperationPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={gitOperationPipelineDataObject} fieldName={"action"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

GitOperationPipelineStepConfigurationSummaryPanel.propTypes = {
  gitOperationPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default GitOperationPipelineStepConfigurationSummaryPanel;
