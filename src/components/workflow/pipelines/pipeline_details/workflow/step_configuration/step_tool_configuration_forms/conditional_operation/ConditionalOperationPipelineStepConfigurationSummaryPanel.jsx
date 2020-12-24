import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import PipelineSummariesField from "components/common/form_fields/pipelines/PipelineSummariesField";
import PipelineConditionsField from "../../../../../../../common/fields/workflow/pipelines/PipelineConditionsField";

function ConditionalOperationPipelineStepConfigurationSummaryPanel({ conditionalOperationDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <PipelineConditionsField dataObject={conditionalOperationDataObject} fieldName={"conditions"}/>
        </Col>
        <Col lg={6}>
          <PipelineSummariesField dataObject={conditionalOperationDataObject} fieldName={"pipelineId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ConditionalOperationPipelineStepConfigurationSummaryPanel.propTypes = {
  conditionalOperationDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ConditionalOperationPipelineStepConfigurationSummaryPanel;
