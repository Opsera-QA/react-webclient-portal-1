import React from "react";
import PropTypes from "prop-types";
import KpiCategoryFilter from "components/common/filters/insights/marketplace/kpi_category/KpiCategoryFilter";

function InlineKpiCategoryFilter({ fieldName, filterModel, setFilterModal, loadData}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <KpiCategoryFilter
      inline={true}
      fieldName={fieldName}
      setFilterModel={setFilterModal}
      filterModel={filterModel}
      setDataFunction={setDataFunction}
    />
  );
}

InlineKpiCategoryFilter.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModal: PropTypes.func,
  loadData: PropTypes.func
};

InlineKpiCategoryFilter.defaultProps = {
  fieldName: "category"
}

export default InlineKpiCategoryFilter;