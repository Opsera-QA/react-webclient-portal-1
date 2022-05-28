import React from "react";
import PropTypes from "prop-types";
import FilterMultiSelectInputBase from "../../../input/FilterMultiSelectInputBase";

function GitCustodianStatusSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterMultiSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By Status"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
      setDataFunction={setDataFunction}
    />
  );
}

GitCustodianStatusSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.array
};

GitCustodianStatusSelectInput.defaultProps = {
  fieldName: "status",
  options: [],
};

export default GitCustodianStatusSelectInput;