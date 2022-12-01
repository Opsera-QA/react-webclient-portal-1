import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineInstructionsStatusConstants
  from "@opsera/definitions/constants/pipelines/instructions/status/pipelineInstructionsStatus.constants";

export default function PipelineInstructionsStatusSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={pipelineInstructionsStatusConstants.PIPELINE_INSTRUCTION_STATUS_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      placeholderText={"Select Type"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

PipelineInstructionsStatusSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

PipelineInstructionsStatusSelectInput.defaultProps = {
  fieldName: "type",
};