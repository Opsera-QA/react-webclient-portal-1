import React from "react";
import PropTypes from "prop-types";
import GitCustodianRepositoriesSelectInput from "./GitCustodianRepositoriesSelectInput";

function InlineGitCustodianRepositoriesSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianRepositoriesSelectInput
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

InlineGitCustodianRepositoriesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array
};

InlineGitCustodianRepositoriesSelectInput.defaultProps = {
  fieldName: "repositories",
  options: [],
};

export default InlineGitCustodianRepositoriesSelectInput;