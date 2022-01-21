import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import JsonField from "../../../../../../../common/fields/json/JsonField";

function SentinelStepConfigurationSummaryPanel({ sentenialStepFormMetadata, pipelineData, setActiveTab }) {
  if (sentenialStepFormMetadata == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={sentenialStepFormMetadata} fieldName={"gitBranch"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sentenialStepFormMetadata} fieldName={"repository"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sentenialStepFormMetadata} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sentenialStepFormMetadata} fieldName={"commands"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sentenialStepFormMetadata} fieldName={"tag"}/>
        </Col>
        <Col lg={6}>
          <JsonField dataObject={sentenialStepFormMetadata} fieldName={"customParameters"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SentinelStepConfigurationSummaryPanel.propTypes = {
  sentenialStepFormMetadata: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SentinelStepConfigurationSummaryPanel;