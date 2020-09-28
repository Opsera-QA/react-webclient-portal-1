import React from "react";
import PropTypes from "prop-types";
import DtoFilterInput from "../../input/dto_input/dto-filter-input";
import {createFilterOptions} from "../filterHelpers";

function SortFilter({ filterDto, setFilterDto}) {
  return (
    <div><DtoFilterInput fieldName={"sortOption"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={createFilterOptions(filterDto.getMetaData()["sortOptions"], "Sort", "text", "option")} /></div>
  );
}

SortFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default SortFilter;


