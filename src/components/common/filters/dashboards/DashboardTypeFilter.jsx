import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {dashboardTypes} from "components/common/list_of_values_input/insights/dashboards/DashboardTypeSelectInput";

function DashboardTypeFilter({ filterModel, setFilterModel, className, fieldName }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        placeholderText={"Filter by Dashboard Type"}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        selectOptions={dashboardTypes}
      />
    </div>
  );
}

DashboardTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

DashboardTypeFilter.defaultProps = {
  fieldName: "type"
};

export default DashboardTypeFilter;


