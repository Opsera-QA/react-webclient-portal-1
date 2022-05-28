import React from "react";
import PropTypes from "prop-types";
import GitCustodianStatusSelectInput from "./GitCustodianStatusSelectInput";

function InlineGitCustodianStatusSelectInput({ fieldName, filterModel, setFilterModel, loadData, className, options, inline}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData("currentPage", 1);
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <GitCustodianStatusSelectInput
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

InlineGitCustodianStatusSelectInput.propTypes = {
  fieldName: PropTypes.string,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array,
  inline: PropTypes.bool
};

InlineGitCustodianStatusSelectInput.defaultProps = {
  fieldName: "status",
  options: [],
  inline: true
};

export default InlineGitCustodianStatusSelectInput;