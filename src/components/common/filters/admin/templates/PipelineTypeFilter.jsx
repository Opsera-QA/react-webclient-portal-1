import React from "react";
import PropTypes from "prop-types";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PipelineTypeFilter({ filterDto, setFilterDto, className }) {
  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"type"}
        placeholderText={"Filter by Template Type"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={pipelineHelpers.PIPELINE_TYPES_}
      />
    </div>
  );
}

PipelineTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string
};

export default PipelineTypeFilter;