import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import SFDCJobSummaryCardContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/configuration_forms/SFDCJobSummaryCardContainer";

function SfdcPipelineStepConfigurationSummaryPanel({ sfdcDataObject, pipelineData, setActiveTab }) {
  
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <SFDCJobSummaryCardContainer 
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
