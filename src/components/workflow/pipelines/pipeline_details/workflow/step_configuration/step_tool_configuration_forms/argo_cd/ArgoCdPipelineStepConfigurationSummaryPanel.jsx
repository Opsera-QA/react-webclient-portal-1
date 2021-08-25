import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function ArgoCdPipelineStepConfigurationSummaryPanel({ argoCdPipelineDataObject, pipelineData, setActiveTab }) {

  if (argoCdPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={argoCdPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"dockerStepID"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"existingContent"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"toolUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"userName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"applicationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"gitWorkspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"bitbucketWorkspaceName"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={argoCdPipelineDataObject} fieldName={"sshUrl"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ArgoCdPipelineStepConfigurationSummaryPanel.propTypes = {
  argoCdPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ArgoCdPipelineStepConfigurationSummaryPanel;
