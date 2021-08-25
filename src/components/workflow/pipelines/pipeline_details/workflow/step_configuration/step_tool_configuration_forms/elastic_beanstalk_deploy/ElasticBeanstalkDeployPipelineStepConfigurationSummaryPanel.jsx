import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function ElasticBeanstalkDeployPipelineStepConfigurationSummaryPanel({ elasticBeanstalkDeployPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={elasticBeanstalkDeployPipelineStepData} fieldName={"awsToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"bucketName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"ec2KeyName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"port"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"platform"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"applicationName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"applicationVersionLabel"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"s3StepId"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={elasticBeanstalkDeployPipelineStepData} fieldName={"description"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ElasticBeanstalkDeployPipelineStepConfigurationSummaryPanel.propTypes = {
  elasticBeanstalkDeployPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ElasticBeanstalkDeployPipelineStepConfigurationSummaryPanel;
