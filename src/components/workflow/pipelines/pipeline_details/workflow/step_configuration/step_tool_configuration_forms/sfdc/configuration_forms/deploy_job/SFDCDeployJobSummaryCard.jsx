import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import SFDCJobSummaryCardContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/configuration_forms/SFDCJobSummaryCardContainer";

function SFDCDeployJobSummaryCard({ sfdcStepConfigurationDto, isLoading }) {
  if (isLoading) {
    return <SFDCJobSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <SFDCJobSummaryCardContainer sfdcStepConfigurationDto={sfdcStepConfigurationDto} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcToolName"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcUnitTestType"} />
      </div>
    </SFDCJobSummaryCardContainer>
  );
}

SFDCDeployJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SFDCDeployJobSummaryCard;
