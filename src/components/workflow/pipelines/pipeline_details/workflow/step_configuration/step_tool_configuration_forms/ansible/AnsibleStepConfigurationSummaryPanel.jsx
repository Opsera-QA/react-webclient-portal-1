import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";

function AnsibleStepConfigurationSummaryPanel({ ansiblePipelineDataObject, pipelineData, setActiveTab }) {
  if (ansiblePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={ansiblePipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={ansiblePipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"repoId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"sshUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansiblePipelineDataObject} fieldName={"playbookFileName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AnsibleStepConfigurationSummaryPanel.propTypes = {
  ansiblePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AnsibleStepConfigurationSummaryPanel;
