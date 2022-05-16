import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function S3PipelineStepConfigurationSummaryPanel({ s3DataObject, pipelineData }) {
  return (
    <PipelineStepSummaryPanelContainer pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={s3DataObject} fieldName={"awsToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"s3Url"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"buildStepId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"bucketName"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

S3PipelineStepConfigurationSummaryPanel.propTypes = {
  s3DataObject: PropTypes.object,
  pipelineData: PropTypes.object,
};


export default S3PipelineStepConfigurationSummaryPanel;
