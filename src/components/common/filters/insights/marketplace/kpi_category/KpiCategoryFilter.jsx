import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {KPI_CATEGORY_SELECT_OPTIONS} from "components/common/list_of_values_input/admin/kpi_configurations/categories/kpiCategory.types";

function KpiCategoryFilter({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By Category"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={KPI_CATEGORY_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
    />
  );
}

KpiCategoryFilter.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string
};

KpiCategoryFilter.defaultProps = {
  fieldName: "category"
};

export default KpiCategoryFilter;