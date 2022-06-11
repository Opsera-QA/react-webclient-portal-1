import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSortSelectInput({ paginationModel, loadData, isLoading, className}) {
  const updateSortOption = (fieldName, sortOption) => {
    paginationModel.setData("currentPage", 1);
    paginationModel.setData("sortOption", sortOption?.value);
    loadData(paginationModel);
  };

  if (paginationModel == null || paginationModel?.canSort() !== true || paginationModel?.getSortOptions() == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      dataObject={paginationModel}
      fieldName={"sortOption"}
      inline={true}
      className={className}
      selectOptions={paginationModel?.getSortOptions()}
      valueField={"value"}
      textField={(sortOption) => `Sort: ${sortOption?.text}`}
      disabled={isLoading || paginationModel?.getData("totalCount") == null}
      placeholder={"Sort Page"}
      setDataFunction={updateSortOption}
    />
  );
}

PageSortSelectInput.propTypes = {
  paginationModel: PropTypes.object,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  className: PropTypes.string,
};

export default PageSortSelectInput;


