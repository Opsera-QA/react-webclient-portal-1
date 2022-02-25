import React from "react";
import PropTypes from "prop-types";
import KpiCategoryFilterSelectInput from "components/common/filters/insights/kpi/category/KpiCategoryFilterSelectInput";

function InlineKpiCategoryFilterSelectInput({ fieldName, filterModel, setFilterModel, loadData, className}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <KpiCategoryFilterSelectInput
      inline={true}
      fieldName={fieldName}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      className={className}
      setDataFunction={setDataFunction}
    />
  );
}

InlineKpiCategoryFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string
};

InlineKpiCategoryFilterSelectInput.defaultProps = {
  fieldName: "category"
};

export default InlineKpiCategoryFilterSelectInput;