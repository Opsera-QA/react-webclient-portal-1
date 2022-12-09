import React from "react";
import PropTypes from "prop-types";
import PipelineInstructionsFieldBase
  from "components/common/list_of_values_input/workflow/instructions/PipelineInstructionsFieldBase";
import useGetPipelineInstructionModelById
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelById";

export default function PipelineInstructionsField(
  {
    model,
    fieldName,
    className,
    showInstructions,
    instructionsDisplayerMaximumHeight,
    instructionsDisplayerMinimumHeight,
    allowEditing,
  }) {
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
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
      setPipelineInstructionsModel={setPipelineInstructionsModel}
      isLoading={isLoading}
      error={error}
      allowEditing={allowEditing}
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
  allowEditing: PropTypes.bool,
};