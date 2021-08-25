import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function OctopusPipelineStepConfigurationSummaryPanel({ octopusPipelineDataObject, pipelineData, setActiveTab }) {

  if (octopusPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={octopusPipelineDataObject} fieldName={"octopusToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"toolURL"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"spaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"projectName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"environmentName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"spaceId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"environmentId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={octopusPipelineDataObject} fieldName={"octopusPhysicalPath"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

OctopusPipelineStepConfigurationSummaryPanel.propTypes = {
  octopusPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default OctopusPipelineStepConfigurationSummaryPanel;
