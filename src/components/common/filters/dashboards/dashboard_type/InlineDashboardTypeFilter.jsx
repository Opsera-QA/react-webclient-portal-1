import React from "react";
import PropTypes from "prop-types";
import DashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/DashboardTypeFilter";

function InlineDashboardTypeFilter({ filterModel, setFilterModel, fieldName, className, loadData, isLoading }) {
  const validateAndSetData = (fieldName, selectedOption) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, selectedOption?.value);
    loadData(newDataObject);
  };

  return (
    <DashboardTypeFilter
      className={className}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      loadingData={isLoading}
      fieldName={fieldName}
      setDataFunction={validateAndSetData}
      inline={true}
    />
  );
}


InlineDashboardTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

InlineDashboardTypeFilter.defaultProps = {
  fieldName: "type"
};

export default InlineDashboardTypeFilter;


