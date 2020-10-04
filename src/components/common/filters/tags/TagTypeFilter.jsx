import React from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../../input/dto_input/filter/DtoFilterSelectInput";
import {createFilterOptions} from "../filterHelpers";
import {defaultTags} from "../../../settings/tags/tags-form-fields";

function TagTypeFilter({ filterDto, setFilterDto}) {
  return (
    <div><DtoFilterSelectInput fieldName={"type"} placeholderText={"Filter by Tag Type"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={createFilterOptions(defaultTags, "Tag", "value", "type")} /></div>
  );
}


TagTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default TagTypeFilter;


