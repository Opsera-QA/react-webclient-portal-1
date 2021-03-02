import React from "react";
import PropTypes from "prop-types";
import DashboardPersonaFilter from "components/common/filters/dashboards/dashboard_persona/DashboardPersonaFilter";

function InlineDashboardPersonaFilter({ filterModel, setFilterModel, fieldName, className, loadData, isLoading }) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <DashboardPersonaFilter
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


InlineDashboardPersonaFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

InlineDashboardPersonaFilter.defaultProps = {
  fieldName: "persona"
};

export default InlineDashboardPersonaFilter;


