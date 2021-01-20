import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function ArgoCDPipelineStepConfigurationSummaryPanel({ argoCdPipelineDataObject, pipelineData, setActiveTab }) {

  if (argoCdPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"dockerStepID"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"existingContent"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"toolUrl"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"userName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"applicationName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitWorkspace"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"bitbucketWorkspace"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={argoCdPipelineDataObject} fieldName={"sshUrl"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ArgoCDPipelineStepConfigurationSummaryPanel.propTypes = {
  argoCdPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ArgoCDPipelineStepConfigurationSummaryPanel;
