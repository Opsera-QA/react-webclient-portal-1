import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import pipelineInstructionsTypeConstants
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsType.constants";

function PipelineInstructionsTypeFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    setDataFunction,
    className,
    inline,
  }) {
  return (
    <FilterSelectInputBase
      placeholderText={"Filter by Type"}
      fieldName={fieldName}
      className={className}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      setDataFunction={setDataFunction}
      selectOptions={pipelineInstructionsTypeConstants.PIPELINE_INSTRUCTION_TYPE_SELECT_OPTIONS}
      textField={"text"}
      valueField={"value"}
      inline={inline}
    />
  );
}


PipelineInstructionsTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool
};

PipelineInstructionsTypeFilter.defaultProps = {
  fieldName: "type"
};

export default PipelineInstructionsTypeFilter;
