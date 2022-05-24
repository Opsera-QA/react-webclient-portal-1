import React from "react";
import PropTypes from "prop-types";
import GitCustodianServicesSelectInput from "./GitCustodianServicesSelectInput";

function InlineGitCustodianServiceSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianServicesSelectInput
      inline={false}
      fieldName={fieldName}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      className={className}
      setDataFunction={setDataFunction}
      options={options}
    />
  );
}

InlineGitCustodianServiceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array
};

InlineGitCustodianServiceSelectInput.defaultProps = {
  fieldName: "service",
  options: [],
};

export default InlineGitCustodianServiceSelectInput;