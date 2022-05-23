import React from "react";
import PropTypes from "prop-types";
import GitCustodianStatusSelectInput from "./GitCustodianStatusSelectInput";

function InlineGitCustodianStatusSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianStatusSelectInput
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

InlineGitCustodianStatusSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array
};

InlineGitCustodianStatusSelectInput.defaultProps = {
  fieldName: "status",
  options: [],
};

export default InlineGitCustodianStatusSelectInput;