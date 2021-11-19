import React from "react";
import PropTypes from "prop-types";
import KpiPolicySupportFilterSelectInput
  from "components/common/filters/insights/kpi/policy_support/KpiPolicySupportFilterSelectInput";

function InlineKpiPolicySupportFilterSelectInput({ fieldName, filterModel, setFilterModel, loadData, className}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <KpiPolicySupportFilterSelectInput
      inline={true}
      fieldName={fieldName}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      className={className}
      setDataFunction={setDataFunction}
    />
  );
}

InlineKpiPolicySupportFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string
};

InlineKpiPolicySupportFilterSelectInput.defaultProps = {
  fieldName: "category"
};

export default InlineKpiPolicySupportFilterSelectInput;