import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function CommandLinePipelineStepConfigurationSummaryPanel({ commandLinePipelineDataObject, pipelineData, setActiveTab }) {
  if (commandLinePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"type"}/>
        </Col>


        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"gitCredential"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"gitBranch"}/>
        </Col>


        {/* <Col lg={6}>
          <TextFieldBase dataObject={commandLinePipelineDataObject} fieldName={"gitToolId"}/>
        </Col> */}
        <Col lg={12}>
          <JsonField dataObject={commandLinePipelineDataObject} fieldName={"dependencyType"} />
        </Col>
        {/* <Col lg={6}>
          <JsonField dataObject={commandLinePipelineDataObject} fieldName={"dependencies"} />
        </Col> */}
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

CommandLinePipelineStepConfigurationSummaryPanel.propTypes = {
  commandLinePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default CommandLinePipelineStepConfigurationSummaryPanel;
