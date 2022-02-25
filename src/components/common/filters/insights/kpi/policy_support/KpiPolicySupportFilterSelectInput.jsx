import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const NOTIFICATION_POLICY_SUPPORT_OPTIONS = [
  {text: "All", value: undefined},
  {text: "True", value: "active"},
  {text: "False", value: "inactive"}
];

function KpiPolicySupportFilterSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By Policy Support"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={NOTIFICATION_POLICY_SUPPORT_OPTIONS}
      setDataFunction={setDataFunction}
    />
  );
}

KpiPolicySupportFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string
};

KpiPolicySupportFilterSelectInput.defaultProps = {
  fieldName: "policySupport"
};

export default KpiPolicySupportFilterSelectInput;