import React from "react";
import PropTypes from "prop-types";
import DtoFilterInput from "../../input/dto_input/dto-filter-input";
import {createFilterOptions} from "../filterHelpers";
import {defaultTags} from "../../../settings/tags/tags-form-fields";

function TagTypeFilter({ filterDto, setFilterDto}) {
  return (
    <div><DtoFilterInput fieldName={"type"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={createFilterOptions(defaultTags, "Tag", "value", "type")} /></div>
  );
}


TagTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default TagTypeFilter;


