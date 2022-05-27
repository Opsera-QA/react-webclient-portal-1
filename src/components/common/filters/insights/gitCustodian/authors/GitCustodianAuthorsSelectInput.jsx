import React from "react";
import PropTypes from "prop-types";
import FilterMultiSelectInputBase from "../../../input/FilterMultiSelectInputBase";

function GitCustodianAuthorsSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterMultiSelectInputBase
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter by Authors"}
      groupBy={"authors"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
      inline={inline}
      setDataFunction={setDataFunction}
    />
  );
}

GitCustodianAuthorsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.array
};

GitCustodianAuthorsSelectInput.defaultProps = {
  fieldName: "authors",
  options: [],
};

export default GitCustodianAuthorsSelectInput;