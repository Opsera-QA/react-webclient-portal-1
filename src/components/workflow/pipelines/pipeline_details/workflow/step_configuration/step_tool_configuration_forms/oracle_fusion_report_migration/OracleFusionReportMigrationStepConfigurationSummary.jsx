import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function OracleFusionReportMigrationStepConfigurationSummary({ oracleFusionReportMigrationPipelineDataObject, pipelineData, setActiveTab }) {
  if (oracleFusionReportMigrationPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"blackDuckToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitRepository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"defaultBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitFilePath"}/>
        </Col>        
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"projectName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"tag"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

OracleFusionReportMigrationStepConfigurationSummary.propTypes = {
  oracleFusionReportMigrationPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default OracleFusionReportMigrationStepConfigurationSummary;
