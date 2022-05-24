import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function GitCustodianAuthorsSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By Authors"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
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