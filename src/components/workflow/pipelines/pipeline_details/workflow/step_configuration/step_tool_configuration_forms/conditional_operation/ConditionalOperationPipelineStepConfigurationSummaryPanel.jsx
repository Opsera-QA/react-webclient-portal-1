import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import PipelineConditionsField from "../../../../../../../common/fields/workflow/pipelines/PipelineConditionsField";
import PipelineSummaryField from "components/common/fields/pipelines/PipelineSummaryField";

function ConditionalOperationPipelineStepConfigurationSummaryPanel({ conditionalOperationDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <PipelineConditionsField dataObject={conditionalOperationDataObject} fieldName={"conditions"}/>
        </Col>
        <Col lg={6}>
          <PipelineSummaryField
            pipelineId={conditionalOperationDataObject?.getData("pipelineId")}
            model={conditionalOperationDataObject}
            fieldName={"pipelineId"}
          />
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
