import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import JsonField from "components/common/fields/json/JsonField";

function AnsibleStepConfigurationSummaryPanel({ ansibleDataObject, pipelineData, setActiveTab }) {

  if (ansibleDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={ansibleDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={ansibleDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"repoId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"sshUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleDataObject} fieldName={"playbookFileName"}/>
        </Col>
        {/*Disabling Command Line args as part of OPL 2400*/}
        {/*<Col lg={6}>*/}
        {/*  <JsonField dataObject={ansibleDataObject} fieldName={"commandArgs"}/>*/}
        {/*</Col>        */}
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AnsibleStepConfigurationSummaryPanel.propTypes = {
  ansibleDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AnsibleStepConfigurationSummaryPanel;
