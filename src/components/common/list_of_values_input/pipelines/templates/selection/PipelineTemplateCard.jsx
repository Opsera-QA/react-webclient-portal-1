import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";

export default function PipelineTemplateCard(
  {
    pipelineTemplate,
    selectCardFunction,
    selectedPipelineTemplate,
    disabled,
    className,
  }) {
  const handleOnClickFunction = () => {
    if (disabled !== true) {
      selectCardFunction(pipelineTemplate);
    }
  };

  if (pipelineTemplate == null) {
    return null;
  }

  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={handleOnClickFunction}
        selectedOption={selectedPipelineTemplate?._id}
        option={pipelineTemplate?._id}
        text={pipelineTemplate?.name}
        description={pipelineTemplate?.description}
        disabled={disabled}
      />
    </div>
  );
}

PipelineTemplateCard.propTypes = {
  selectCardFunction: PropTypes.func,
  pipelineTemplate: PropTypes.object,
  selectedPipelineTemplate: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};