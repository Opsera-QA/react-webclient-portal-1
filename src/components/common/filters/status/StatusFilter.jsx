import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const statusOptions = [
  {text: "Status: All", value: undefined},
  {text: "Status: Active", value: "active"},
  {text: "Status: Inactive", value: "inactive"}
];

function StatusFilter({ filterDto, setFilterDto, className, fieldName, inline}) {
  if (filterDto == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      fieldName={fieldName}
      inline={inline}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      selectOptions={statusOptions}
    />
  );
}

StatusFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool
};

StatusFilter.defaultProps = {
  fieldName: "status"
};

export default StatusFilter;


