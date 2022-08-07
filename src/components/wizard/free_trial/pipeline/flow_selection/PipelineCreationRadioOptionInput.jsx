import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";

export const PIPELINE_CREATION_OPTIONS = {
  SALESFORCE: "Salesforce.com",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "Software Development Life Cycle",
};

function PipelineCreationRadioOptionInput(
  {
    className,
    selectedOption,
    setSelectedOption,
  }) {
  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={PIPELINE_CREATION_OPTIONS.SALESFORCE}
        text={"Salesforce.com"}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
      <WizardSelectionRadioOption
        className={"mt-2"}
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={PIPELINE_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
        text={"Software Development Life Cycle"}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
    </div>
  );
}

PipelineCreationRadioOptionInput.propTypes = {
  className: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
};

export default PipelineCreationRadioOptionInput;


