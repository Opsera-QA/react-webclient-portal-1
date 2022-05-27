import React from "react";
import PropTypes from "prop-types";
import FilterMultiSelectInputBase from "../../../input/FilterMultiSelectInputBase";

function GitCustodianServicesSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterMultiSelectInputBase
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter by Service"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
      inline={inline}
      setDataFunction={setDataFunction}
    />
  );
}

GitCustodianServicesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.array
};

GitCustodianServicesSelectInput.defaultProps = {
  fieldName: "service",
  options: [],
};

export default GitCustodianServicesSelectInput;