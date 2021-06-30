import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSizeSelectInput({ paginationModel, loadData, isLoading}) {
  const updatePageSize = (fieldName, pageSize) => {
    paginationModel.setData("currentPage", 1);
    paginationModel.setData("pageSize", pageSize);
    loadData(paginationModel);
  };

  if (paginationModel == null || paginationModel.canSetPageSize() === false) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={"inline-filter-input inline-select-filter"}
      selectOptions={paginationModel.getPageSizes()}
      formatItems={false}
      showLabel={false}
      dataObject={paginationModel}
      textField={"text"}
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
  showPageSize: PropTypes.bool
};

export default PageSizeSelectInput;


