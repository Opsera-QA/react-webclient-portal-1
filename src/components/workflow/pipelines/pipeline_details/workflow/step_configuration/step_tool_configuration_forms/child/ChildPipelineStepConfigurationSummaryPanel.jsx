import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import PipelineSummariesField from "../../../../../../../common/form_fields/pipelines/PipelineSummariesField";

function ChildPipelineStepConfigurationSummaryPanel({ childPipelineDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={12}>
          <PipelineSummariesField dataObject={childPipelineDataObject} fieldName={"pipelineId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

ChildPipelineStepConfigurationSummaryPanel.propTypes = {
  childPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ChildPipelineStepConfigurationSummaryPanel;
