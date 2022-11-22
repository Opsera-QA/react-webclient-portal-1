import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import modelHelpers from "components/common/model/modelHelpers";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function AnsibleStepConfigurationSummaryPanel({ pipelineStep, setActiveTab }) {
  const ansibleModel = modelHelpers.getPipelineStepModelForToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE, pipelineStep);

  if (ansibleModel == null) {
    return undefined;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineStep}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={ansibleModel} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={ansibleModel} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"repoId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"sshUrl"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={ansibleModel} fieldName={"playbookFileName"}/>
        </Col>
        {/*Disabling Command Line args as part of OPL 2400*/}
        {/*<Col lg={6}>*/}
        {/*  <JsonField dataObject={ansibleModel} fieldName={"commandArgs"}/>*/}
        {/*</Col>        */}
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AnsibleStepConfigurationSummaryPanel.propTypes = {
  pipelineStep: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AnsibleStepConfigurationSummaryPanel;
