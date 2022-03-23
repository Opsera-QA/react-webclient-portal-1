import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import JsonField from "components/common/fields/json/JsonField";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

function TerraformVcsStepConfigurationSummaryPanel({ terraformVcsPipelineDataObject, pipelineData, setActiveTab }) {
  if (terraformVcsPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformVcsPipelineDataObject} fieldName={"organizationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase model={terraformVcsPipelineDataObject} fieldName={"workspaceName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TerraformVcsStepConfigurationSummaryPanel.propTypes = {
  terraformVcsPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TerraformVcsStepConfigurationSummaryPanel;
