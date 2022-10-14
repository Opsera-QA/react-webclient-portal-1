import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function DockerCliPipelineStepConfigurationSummary({ dockerCliPipelineDataObject, pipelineData, setActiveTab }) {
  if (dockerCliPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"toolName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"toolJobName"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"type"}/>
        </Col>


        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitCredential"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6} className={"upper-case-first"}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>


        {/* <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitToolId"}/>
        </Col> */}
        <Col lg={12}>
          <JsonField dataObject={dockerCliPipelineDataObject} fieldName={"dependencyType"} />
        </Col>
        {/* <Col lg={6}>
          <JsonField dataObject={dockerCliPipelineDataObject} fieldName={"dependencies"} />
        </Col> */}
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

DockerCliPipelineStepConfigurationSummary.propTypes = {
  dockerCliPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default DockerCliPipelineStepConfigurationSummary;
