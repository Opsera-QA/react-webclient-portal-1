import React from "react";
import PropTypes from "prop-types";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PipelineTypeFilter({ filterDto, setFilterDto, setDataFunction, className, inline, fieldName, isLoading }) {
  if (filterDto == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        placeholderText={"Filter by Pipeline Type"}
        setDataObject={setFilterDto}
        setDataFunction={setDataFunction}
        dataObject={filterDto}
        disabled={isLoading}
        selectOptions={pipelineHelpers.PIPELINE_TYPES_}
        inline={inline}
      />
    </div>
  );
}

PipelineTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  isLoading: PropTypes.bool
};

PipelineTypeFilter.defaultProps = {
  fieldName: "type"
};

export default PipelineTypeFilter;