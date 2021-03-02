import React from "react";
import PropTypes from "prop-types";
import DashboardTemplateSourceFilterInput
  from "components/common/filters/insights/marketplace/dashboards/DashboardTemplateSourceFilterInput";

function InlineDashboardTemplateSourceFilterInput({ fieldName, filterModel, setFilterModel, loadData, disabled, className }) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <DashboardTemplateSourceFilterInput
      fieldName={fieldName}
      filterModel={filterModel}
      setDataFunction={setDataFunction}
      setFilterModel={setFilterModel}
      disabled={disabled}
      inline={true}
      className={className}
    />
  );
}

InlineDashboardTemplateSourceFilterInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  loadData: PropTypes.func,
  className: PropTypes.string
};

InlineDashboardTemplateSourceFilterInput.defaultProps = {
  fieldName: "source",
};

export default InlineDashboardTemplateSourceFilterInput;