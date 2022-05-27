import React from "react";
import PropTypes from "prop-types";
import FilterMultiSelectInputBase from "../../../input/FilterMultiSelectInputBase";

function GitCustodianRepositoriesSelectInput({ fieldName, filterModel, setFilterModel, setDataFunction, inline, className, options}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterMultiSelectInputBase
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter by Repositories"}
      groupBy={"repositories"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      selectOptions={options}
      inline={inline}
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