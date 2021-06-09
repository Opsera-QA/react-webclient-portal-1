import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import SfdcJobSummaryCardContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/configuration_forms/SfdcJobSummaryCardContainer";

function SfdcPipelineStepConfigurationSummaryPanel({ sfdcDataObject, pipelineData, setActiveTab }) {
  
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <SfdcJobSummaryCardContainer 
          sfdcStepConfigurationDto={sfdcDataObject}
        />
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SfdcPipelineStepConfigurationSummaryPanel.propTypes = {
  sfdcDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SfdcPipelineStepConfigurationSummaryPanel;
