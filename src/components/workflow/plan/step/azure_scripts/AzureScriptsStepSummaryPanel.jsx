import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import ScriptTypeField from "components/common/list_of_values_input/scripts/ScriptTypeField";

function AzureScriptsStepSummaryPanel(
  {
    azureScriptsStepModel,
    pipelineData,
    setActiveTab,
  }) {
  if (azureScriptsStepModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer
      setActiveTab={setActiveTab}
      pipelineData={pipelineData}
    >
      <Row>
        <Col lg={6}>
          <ToolNameField
            model={azureScriptsStepModel}
            fieldName={"azureToolConfigId"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={azureScriptsStepModel}
            fieldName={"azureCredentialId"}
          />
        </Col>
        <Col lg={6}>
          <ScriptTypeField
            dataObject={azureScriptsStepModel}
            fieldName={"type"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={azureScriptsStepModel}
            fieldName={"inlineCommand"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={azureScriptsStepModel}
            fieldName={"filePath"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={azureScriptsStepModel}
            fieldName={"fileName"}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureScriptsStepSummaryPanel.propTypes = {
  azureScriptsStepModel: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureScriptsStepSummaryPanel;