import React from "react";
import PropTypes from "prop-types";
import GitCustodianRepositoriesSelectInput from "./GitCustodianRepositoriesSelectInput";

function InlineGitCustodianRepositoriesSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options, inline}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianRepositoriesSelectInput
      inline={inline}
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
  options: PropTypes.array,
  inline: PropTypes.bool
};

InlineGitCustodianRepositoriesSelectInput.defaultProps = {
  fieldName: "repositories",
  options: [],
  inline: true
};

export default InlineGitCustodianRepositoriesSelectInput;