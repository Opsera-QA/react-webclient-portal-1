import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function GitCustodianRepositoriesSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By Repositories"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
      setDataFunction={setDataFunction}
    />
  );
}

GitCustodianRepositoriesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.array
};

GitCustodianRepositoriesSelectInput.defaultProps = {
  fieldName: "repositories",
  options: [],
};

export default GitCustodianRepositoriesSelectInput;