import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const statusOptions = [
  {text: "Status: All", value: undefined},
  {text: "Status: Active", value: "active"},
  {text: "Status: Inactive", value: "inactive"}
];

function StatusFilter({ filterDto, setFilterDto, className}) {
  if (filterDto == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"status"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={statusOptions}
      />
    </div>
  );
}

StatusFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string
};

export default StatusFilter;


