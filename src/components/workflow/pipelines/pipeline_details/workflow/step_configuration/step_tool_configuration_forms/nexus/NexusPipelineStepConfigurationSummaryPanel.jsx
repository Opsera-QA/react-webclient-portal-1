import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function NexusPipelineStepConfigurationSummaryPanel({ nexusPipelineDataObject, pipelineData, setActiveTab }) {

  if (nexusPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={nexusPipelineDataObject} fieldName={"groupName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={nexusPipelineDataObject} fieldName={"artifactName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={nexusPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={nexusPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={nexusPipelineDataObject} fieldName={"artifactStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

NexusPipelineStepConfigurationSummaryPanel.propTypes = {
  nexusPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default NexusPipelineStepConfigurationSummaryPanel;
