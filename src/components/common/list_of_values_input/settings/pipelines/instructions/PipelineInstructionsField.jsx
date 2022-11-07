import React from "react";
import PropTypes from "prop-types";
import PipelineInstructionsFieldBase
  from "components/common/list_of_values_input/settings/pipelines/instructions/PipelineInstructionsFieldBase";
import useGetPipelineInstructionModelById
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelById";

export default function PipelineInstructionsField(
  {
    model,
    fieldName,
    className,
    showInstructions,
    instructionsDisplayerMaximumHeight,
    instructionsDisplayerMinimumHeight,
  }) {
  const {
    pipelineInstructionsModel,
    isLoading,
    error,
  } = useGetPipelineInstructionModelById(
    model?.getData(fieldName),
    false,
  );
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <PipelineInstructionsFieldBase
      className={className}
      showInstructions={showInstructions}
      label={field?.label}
      pipelineInstructionsId={model?.getData(fieldName)}
      instructionsDisplayerMaximumHeight={instructionsDisplayerMaximumHeight}
      instructionsDisplayerMinimumHeight={instructionsDisplayerMinimumHeight}
      pipelineInstructionsModel={pipelineInstructionsModel}
      isLoading={isLoading}
      error={error}
    />
  );
}

PipelineInstructionsField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  showInstructions: PropTypes.bool,
  className: PropTypes.string,
  instructionsDisplayerMaximumHeight: PropTypes.string,
  instructionsDisplayerMinimumHeight: PropTypes.string,
};