import React, { useState } from "react";
import PropTypes from "prop-types";
import PipelineTemplateCardSelectionInput
  from "components/common/list_of_values_input/pipelines/templates/selection/PipelineTemplateCardSelectionInput";

export default function CreateSalesforcePipelineWizardSelectPipelineTemplateScreen(
  {
    className,
    pipelineId,
    setPipelineId,
    setCurrentScreen,
  }) {
  const [selectedPipelineTemplate, setSelectedPipelineTemplate] = useState(undefined);

  const handlePipelineTemplateSelection = (selectedOption) => {
    console.log("Selected Option: " + JSON.stringify(selectedOption));
    setSelectedPipelineTemplate(selectedOption);
  };

  // TODO: How do we fill in the pipeline steps with the relevant information?

  return (
    <div className={className}>
      <PipelineTemplateCardSelectionInput
        selectedPipelineTemplate={selectedPipelineTemplate}
        setDataFunction={handlePipelineTemplateSelection}
        type={"sfdc"}
      />
    </div>
  );
}

CreateSalesforcePipelineWizardSelectPipelineTemplateScreen.propTypes = {
  pipelineId: PropTypes.string,
  setPipelineId: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


