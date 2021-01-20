import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import DtoJsonField from "../../../../../../../common/form_fields/dto_form_fields/dto-json-field";

function TerraformPipelineStepConfigurationSummaryPanel({ terraformPipelineDataObject, pipelineData, setActiveTab }) {

  if (terraformPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={terraformPipelineDataObject} fieldName={"gitRepositoryID"}/>
        </Col>
        <Col lg={6}>
          <DtoJsonField dataObject={terraformPipelineDataObject} fieldName={"keyValueMap"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TerraformPipelineStepConfigurationSummaryPanel.propTypes = {
  terraformPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TerraformPipelineStepConfigurationSummaryPanel;
