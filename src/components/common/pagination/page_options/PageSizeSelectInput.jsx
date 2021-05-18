import React from "react";
import PropTypes from "prop-types";
import VanityComboBoxInput from "components/common/inputs/select/VanityComboBoxInput";

const defaultPageSizes = [
  {id: 5, value: "5 results per page"},
  {id: 10, value: "10 results per page"},
  {id: 25, value: "25 results per page"},
  {id: 50, value: "50 results per page"},
  {id: 100, value: "100 results per page"},
];

function PageSizeSelectInput({ paginationModel, setPaginationModel, loadData, isLoading, pageSizeList, showPageSize}) {
  const updatePageSize = (fieldName, pageSize) => {
    paginationModel.setData("currentPage", 1);
    paginationModel.setData("pageSize", pageSize);
    setPaginationModel({...paginationModel});
    loadData(paginationModel);
  };

  if (showPageSize === false) {
    return null;
  }

  return (
    <VanityComboBoxInput
      className={"inline-filter-input inline-select-filter"}
      selectOptions={pageSizeList ? pageSizeList : defaultPageSizes}
      formatItems={false}
      showLabel={false}
      dataObject={paginationModel}
      setDataObject={setPaginationModel}
      textField={"value"}
      valueField={"id"}
      fieldName={"pageSize"}
      disabled={isLoading || paginationModel?.getData("totalCount") == null}
      placeholder={"Sort Page"}
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


