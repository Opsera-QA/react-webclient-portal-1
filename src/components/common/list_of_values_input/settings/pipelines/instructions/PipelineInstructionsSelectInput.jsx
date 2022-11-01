import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetPipelineInstructions from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructions";

export default function PipelineInstructionsSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    className,
    disabled,
  }) {
  const {
    pipelineInstructions,
    isLoading,
    error,
  } = useGetPipelineInstructions();

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={pipelineInstructions}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      className={className}
    />
  );
}

PipelineInstructionsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};