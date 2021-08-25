import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SshUploadDeployPipelineStepConfigurationSummaryPanel({ sshUploadDeployDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={sshUploadDeployDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sshUploadDeployDataObject} fieldName={"userName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sshUploadDeployDataObject} fieldName={"serverIp"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sshUploadDeployDataObject} fieldName={"serverPath"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sshUploadDeployDataObject} fieldName={"sshAction"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sshUploadDeployDataObject} fieldName={"commands"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SshUploadDeployPipelineStepConfigurationSummaryPanel.propTypes = {
  sshUploadDeployDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default SshUploadDeployPipelineStepConfigurationSummaryPanel;
