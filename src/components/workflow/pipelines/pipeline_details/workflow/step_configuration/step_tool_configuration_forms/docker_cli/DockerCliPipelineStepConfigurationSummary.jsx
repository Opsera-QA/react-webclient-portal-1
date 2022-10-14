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
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={12}>
          <JsonField dataObject={dockerCliPipelineDataObject} fieldName={"dependencyType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"inputFileName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"dockerName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"dockerTagName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"dockerTagType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"dockerDynamicTagName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"registryType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"awsToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"azureToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"azureCredentialId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"azureRegistryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"jfrogToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"port"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"nexusToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={dockerCliPipelineDataObject} fieldName={"dockerPort"}/>
        </Col>        
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
