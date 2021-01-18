import React from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "components/common/filters/input/DtoFilterSelectInput";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import pipelineHelpers from "components/workflow/pipelineHelpers";

function PipelineTypeFilter({ filterDto, setFilterDto }) {
  return (
    <div>
      <DtoFilterSelectInput
        fieldName={"type"}
        placeholderText={"Filter by Template Type"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={createFilterOptions(pipelineHelpers.PIPELINE_TYPES_, "Type", "name", "id")}
      />
    </div>
  );
}

PipelineTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default PipelineTypeFilter;