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
    valueField,
    textField,
  }) {
  const {
    pipelineInstructions,
    isLoading,
    error,
    loadData,
  } = useGetPipelineInstructions();

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      loadDataFunction={loadData}
      // createDataFunction={createDataFunction}
      selectOptions={pipelineInstructions}
      busy={isLoading}
      error={error}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      className={className}
      singularTopic={"Pipeline Instruction"}
      pluralTopic={"Pipeline Instructions"}
    />
  );
}

PipelineInstructionsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

PipelineInstructionsSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};