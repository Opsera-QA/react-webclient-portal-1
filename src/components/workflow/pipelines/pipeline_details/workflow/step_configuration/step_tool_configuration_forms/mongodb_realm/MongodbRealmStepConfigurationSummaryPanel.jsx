import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function MongodbRealmStepConfigurationSummaryPanel({ mongodbRealmPipelineDataObject, pipelineData, setActiveTab }) {
  if (mongodbRealmPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={mongodbRealmPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={mongodbRealmPipelineDataObject} fieldName={"mongoToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={mongodbRealmPipelineDataObject} fieldName={"applicationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={mongodbRealmPipelineDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={mongodbRealmPipelineDataObject} fieldName={"workspaceName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={mongodbRealmPipelineDataObject} fieldName={"repository"} />
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={mongodbRealmPipelineDataObject} fieldName={"gitBranch"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

MongodbRealmStepConfigurationSummaryPanel.propTypes = {
  mongodbRealmPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default MongodbRealmStepConfigurationSummaryPanel;
