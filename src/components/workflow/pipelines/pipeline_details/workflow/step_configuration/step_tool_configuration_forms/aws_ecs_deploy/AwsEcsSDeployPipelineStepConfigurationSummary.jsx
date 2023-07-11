import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "../../../../../../../common/fields/boolean/BooleanField";

function AWSECSDeployPipelineStepConfigurationSummaryPanel({ awsECSDeployPipelineDataObject, pipelineData, setActiveTab }) {
  if (awsECSDeployPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={awsECSDeployPipelineDataObject} fieldName={"ecsServiceDockerStepId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={awsECSDeployPipelineDataObject} fieldName={"ecsServiceTaskId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={awsECSDeployPipelineDataObject} fieldName={"ecsServiceContainerPort"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={awsECSDeployPipelineDataObject} fieldName={"ecsServiceName"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={awsECSDeployPipelineDataObject} fieldName={"dynamicServiceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={awsECSDeployPipelineDataObject} fieldName={"namePretext"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AWSECSDeployPipelineStepConfigurationSummaryPanel.propTypes = {
  awsECSDeployPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AWSECSDeployPipelineStepConfigurationSummaryPanel;
