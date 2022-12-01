import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import pipelineInstructionsStatusConstants
  from "@opsera/definitions/constants/pipelines/instructions/status/pipelineInstructionsStatus.constants";

function PipelineInstructionsStatusFilterSelectInput(
  {
    filterModel,
    setFilterModel,
    setDataFunction,
    className,
    fieldName,
    inline,
    loadDataFunction,
  }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      fieldName={fieldName}
      inline={inline}
      textField={inline === true ? (selectOption) => {return `Status: ${selectOption?.text}`;} : undefined}
      setDataObject={setFilterModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Pipeline Status"}
      dataObject={filterModel}
      selectOptions={pipelineInstructionsStatusConstants.PIPELINE_INSTRUCTION_STATUS_SELECT_OPTIONS}
      loadDataFunction={loadDataFunction}
    />
  );
}

PipelineInstructionsStatusFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
  loadDataFunction: PropTypes.func,
};

PipelineInstructionsStatusFilterSelectInput.defaultProps = {
  fieldName: "status"
};

export default PipelineInstructionsStatusFilterSelectInput;


