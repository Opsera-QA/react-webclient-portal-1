import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import tagTypeConstants from "@opsera/definitions/constants/settings/tags/tagType.constants";

function TagTypeFilter({ fieldName, filterModel, setFilterModel, className, setDataFunction, inline}) {
  if (filterModel == null) {
    return null;
  }
  
  return (
    <FilterSelectInputBase
      fieldName={fieldName}
      placeholderText={"Filter by Tag Type"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={tagTypeConstants.TAG_TYPE_SELECT_OPTIONS}
      className={className}
      setDataFunction={setDataFunction}
      inline={inline}
    />
  );
}

TagTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  fieldName: PropTypes.string
};

TagTypeFilter.defaultProps = {
  fieldName: "type"
};

export default TagTypeFilter;


