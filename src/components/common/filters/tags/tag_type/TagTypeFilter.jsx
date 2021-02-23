import React from "react";
import PropTypes from "prop-types";
import {createFilterOptions} from "components/common/filters/filterHelpers";
import {defaultTags} from "components/settings/tags/tags-metadata";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function TagTypeFilter({ filterDto, setFilterDto}) {
  return (
    <div>
      <FilterSelectInputBase
        fieldName={"type"}
        placeholderText={"Filter by Tag Type"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={createFilterOptions(defaultTags, "Tag", "value", "type")} /></div>
  );
}


TagTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default TagTypeFilter;


