import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function OctopusPipelineStepConfigurationSummaryPanel({ octopusPipelineDataObject, pipelineData, setActiveTab }) {

  if (octopusPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"toolURL"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"octopusApiKey"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"spaceName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"projectName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"releaseVersion"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"environmentName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"octopusToolId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"spaceId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"projectId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"releaseVersionId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={octopusPipelineDataObject} fieldName={"environmentId"}/>
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
