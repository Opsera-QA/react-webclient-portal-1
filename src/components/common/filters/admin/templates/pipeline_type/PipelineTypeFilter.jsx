import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {PIPELINE_TYPE_SELECT_OPTIONS} from "components/common/list_of_values_input/pipelines/types/pipeline.types";

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
        selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
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