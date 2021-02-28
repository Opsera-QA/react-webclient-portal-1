import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

export const dashboardTemplateSources = [
  {value: "public", text: "Public Marketplace"},
  {value: "customer", text: "Private Catalog"},
];

function DashboardTemplateSourceFilterInput({ fieldName, filterModel, setFilterModel, setDataFunction, disabled, inline, className }) {
  return (
    <FilterSelectInputBase
      fieldName={fieldName}
      dataObject={filterModel}
      setDataObject={setFilterModel}
      setDataFunction={setDataFunction}
      selectOptions={dashboardTemplateSources}
      valueField="value"
      inline={inline}
      textField="text"
      disabled={disabled}
      className={className}
    />
  );
}

DashboardTemplateSourceFilterInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  inline: PropTypes.bool,
  className: PropTypes.string
};

DashboardTemplateSourceFilterInput.defaultProps = {
  fieldName: "source",
};

export default DashboardTemplateSourceFilterInput;