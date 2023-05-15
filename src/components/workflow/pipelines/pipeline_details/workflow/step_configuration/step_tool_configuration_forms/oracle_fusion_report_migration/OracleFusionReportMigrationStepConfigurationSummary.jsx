import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import ArrayToTextField from "components/common/fields/text/ArrayToTextField";

function OracleFusionReportMigrationStepConfigurationSummary({ oracleFusionReportMigrationPipelineDataObject, pipelineData, setActiveTab }) {
  if (oracleFusionReportMigrationPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  const getPullReportsFields = () => {
    if (oracleFusionReportMigrationPipelineDataObject?.getData("migrationType") !== "pull_reports"){
      return null;
    }
    return (
      <>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"sourceInstanceToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"gitCommitId"}/>
        </Col>
      </>
    );
  };
  const getPushReportsFields = () => {
    if (oracleFusionReportMigrationPipelineDataObject?.getData("migrationType") !== "push_reports"){
      return null;
    }
    return (
      <>      
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"artifactoryType"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"nexusToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"groupName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"artifactStepId"}/>
        </Col>
      </>
    );
  };
  const getInstanceToInstanceFields = () => {
    if (oracleFusionReportMigrationPipelineDataObject?.getData("migrationType") !== "instance_to_instance"){
      return null;
    }
    return (
      <>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"sourceInstanceToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"sourceInstancePath"}/>
        </Col>
        <Col lg={12}>
          <ArrayToTextField dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"sourceInstanceReports"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"targetInstanceToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"targetInstancePath"}/>
        </Col>
      </>
    );
  };
  const getArtifactoryToInstanceFields = () => {
    if (oracleFusionReportMigrationPipelineDataObject?.getData("migrationType") !== "artifactory_to_instance"){
      return null;
    }
    return (
      <>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"artifactoryType"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"nexusToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"repositoryName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"groupName"}/>
        </Col>
        <Col lg={12}>
          <ArrayToTextField dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"reportArtifactList"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={oracleFusionReportMigrationPipelineDataObject} fieldName={"targetInstanceToolId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"targetInstancePath"}/>
        </Col>
      </>
    );
  };

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={oracleFusionReportMigrationPipelineDataObject} fieldName={"migrationType"}/>
        </Col>
        {getPullReportsFields()}
        {getPushReportsFields()}
        {getInstanceToInstanceFields()}
        {getArtifactoryToInstanceFields()}        
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
