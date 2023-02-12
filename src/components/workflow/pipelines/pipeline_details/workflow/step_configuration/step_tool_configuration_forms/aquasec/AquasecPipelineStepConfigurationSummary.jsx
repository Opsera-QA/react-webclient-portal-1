import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function AquasecPipelineStepConfigurationSummary({ aquasecPipelineDataObject, pipelineData, setActiveTab }) {
  if (aquasecPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
      <Col lg={6}>
          <ToolNameField model={aquasecPipelineDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <ToolNameField model={aquasecPipelineDataObject} fieldName={"aquasecToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={aquasecPipelineDataObject} fieldName={"buildStepId"} />
        </Col>
        <Col lg={6}>
          <ToolNameField model={aquasecPipelineDataObject} fieldName={"dockerRegistryToolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={aquasecPipelineDataObject} fieldName={"dockerImage"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AquasecPipelineStepConfigurationSummary.propTypes = {
  aquasecPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default AquasecPipelineStepConfigurationSummary;
