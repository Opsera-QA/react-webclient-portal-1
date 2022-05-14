import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {
  dashboardTypeConstants
} from "components/common/list_of_values_input/insights/dashboards/types/dashboardType.constants";

function DashboardTypeFilter({ filterModel, setFilterModel, className, fieldName, inline, setDataFunction }) {
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
        selectOptions={dashboardTypeConstants.DASHBOARD_TYPE_FILTER_SELECT_OPTIONS}
        inline={inline}
        setDataFunction={setDataFunction}
      />
    </div>
  );
}

DashboardTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func
};

DashboardTypeFilter.defaultProps = {
  fieldName: "type"
};

export default DashboardTypeFilter;


