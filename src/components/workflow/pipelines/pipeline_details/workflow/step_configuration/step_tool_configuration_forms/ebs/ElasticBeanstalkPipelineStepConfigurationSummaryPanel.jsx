import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import VaultField from "../../../../../../../common/fields/text/VaultField";

function ElasticBeanstalkPipelineStepConfigurationSummaryPanel({ elasticBeanstalkPipelineStepData, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"awsToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"bucketName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"ec2KeyName"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={elasticBeanstalkPipelineStepData} fieldName={"accessKey"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={elasticBeanstalkPipelineStepData} fieldName={"secretKey"} />
        </Col>
        <Col lg={6}>
          <VaultField dataObject={elasticBeanstalkPipelineStepData} fieldName={"awsAccountId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"port"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"platform"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"applicationName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"applicationVersionLabel"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"s3StepId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"hostedZoneId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"bucketName"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={elasticBeanstalkPipelineStepData} fieldName={"description"} />
        </Col>
        <Col lg={12}>
          <JsonField dataObject={elasticBeanstalkPipelineStepData} fieldName={"dockerVolumePath"} />
        </Col>
        <Col lg={12}>
          <JsonField dataObject={elasticBeanstalkPipelineStepData} fieldName={"environments"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ElasticBeanstalkPipelineStepConfigurationSummaryPanel.propTypes = {
  elasticBeanstalkPipelineStepData: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ElasticBeanstalkPipelineStepConfigurationSummaryPanel;
