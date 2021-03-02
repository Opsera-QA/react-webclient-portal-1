import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {dashboardPersonas} from "components/common/list_of_values_input/insights/dashboards/DashboardPersonaSelectInput";

function DashboardPersonaFilter({ filterModel, setFilterModel, className, fieldName, inline, setDataFunction }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        placeholderText={"Filter by Persona"}
        setDataObject={setFilterModel}
        dataObject={filterModel}
        selectOptions={dashboardPersonas}
        inline={inline}
        setDataFunction={setDataFunction}
      />
    </div>
  );
}

DashboardPersonaFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func
};

DashboardPersonaFilter.defaultProps = {
  fieldName: "persona"
};

export default DashboardPersonaFilter;


