import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SapCpqPipelineStepConfigurationSummaryPanel({ sapCpqPipelineDataObject, pipelineData, setActiveTab }) {

  if (sapCpqPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={sapCpqPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sapCpqPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sapCpqPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sapCpqPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sapCpqPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sapCpqPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SapCpqPipelineStepConfigurationSummaryPanel.propTypes = {
  sapCpqPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default SapCpqPipelineStepConfigurationSummaryPanel;
