import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";

export default function TerraformVcsStepConfigurationSummaryPanel({ terraformVcsStepModel, pipelineData, setActiveTab }) {
  if (terraformVcsStepModel == null) {
    return null;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={terraformVcsStepModel} fieldName={"organizationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase model={terraformVcsStepModel} fieldName={"workspaceName"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

TerraformVcsStepConfigurationSummaryPanel.propTypes = {
  terraformVcsStepModel: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};
