import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const typeOptions = [
  {text: "Pipeline", value: "pipeline"},
  {text: "Planning", value: "planning"},
  {text: "Security", value: "security"},
  {text: "Quality", value: "quality"},
  {text: "Operations", value: "operations"}
];

function DashboardTypeFilter({ filterModel, setFilterModel, className }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={"type"}
        placeholderText={"Filter by Dashboard Type"}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        selectOptions={typeOptions}
      />
    </div>
  );
}

DashboardTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string
};

export default DashboardTypeFilter;


