import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSizeSelectInput({ paginationModel, loadData, isLoading, className}) {
  const updatePageSize = (fieldName, selectedOption) => {
    paginationModel.setData("currentPage", 1);
    paginationModel.setData("pageSize", selectedOption?.value);
    loadData(paginationModel);
  };

  const getTextFieldString = (option) => {
    const value = typeof option === "object" ? option.value : option;

    if (value) {
      return `${value} Results Per Page`;
    }

    return `Select Page Size`;
  };

  if (paginationModel == null || paginationModel.canSetPageSize() === false) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      selectOptions={paginationModel?.getPageSizes()}
      inline={true}
      dataObject={paginationModel}
      textField={getTextFieldString}
      valueField={"value"}
      fieldName={"pageSize"}
      disabled={isLoading || paginationModel?.getData("totalCount") == null}
      placeholder={"Select Page Size"}
      setDataFunction={updatePageSize}
    />
  );
}

PageSizeSelectInput.propTypes = {
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  pageSizeList: PropTypes.array,
  showPageSize: PropTypes.bool,
  className: PropTypes.string,
};

export default PageSizeSelectInput;


