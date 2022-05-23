import React from "react";
import PropTypes from "prop-types";
import GitCustodianAuthorsSelectInput from "./GitCustodianAuthorsSelectInput";

function InlineGitCustodianAuthorsSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianAuthorsSelectInput
      inline={true}
      fieldName={fieldName}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      className={className}
      setDataFunction={setDataFunction}
      options={options}
    />
  );
}

InlineGitCustodianAuthorsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array
};

InlineGitCustodianAuthorsSelectInput.defaultProps = {
  fieldName: "authors",
  options: [],
};

export default InlineGitCustodianAuthorsSelectInput;