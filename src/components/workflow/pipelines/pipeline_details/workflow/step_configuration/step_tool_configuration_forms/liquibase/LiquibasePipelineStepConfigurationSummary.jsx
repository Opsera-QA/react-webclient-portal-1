import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function LiquibasePipelineStepConfigurationSummary({ liquibasePipelineDataObject, pipelineData, setActiveTab }) {
  if (liquibasePipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={liquibasePipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"jobType"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"database"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"warehouse"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={liquibasePipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"scriptFilePath"}/>
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={liquibasePipelineDataObject} fieldName={"baseSchema"}/>
        </Col>        
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

LiquibasePipelineStepConfigurationSummary.propTypes = {
  liquibasePipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default LiquibasePipelineStepConfigurationSummary;
