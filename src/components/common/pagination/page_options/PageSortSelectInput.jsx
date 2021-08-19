import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSort({ paginationModel, loadData, isLoading}) {
  const updateSortOption = (fieldName, sortOption) => {
    paginationModel.setData("currentPage", 1);
    paginationModel.setData("sortOption", sortOption);
    loadData(paginationModel);
  };

  if (paginationModel == null || paginationModel?.canSort() !== true || paginationModel?.getSortOptions() == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      dataObject={paginationModel}
      fieldName={"sortOption"}
      showLabel={false}
      inline={true}
      selectOptions={paginationModel?.getSortOptions()}
      valueField={"value"}
      textField={"text"}
      disabled={isLoading || paginationModel?.getData("totalCount") == null}
      placeholder={"Sort Page"}
      setDataFunction={updateSortOption}
    />
  );
}

PageSort.propTypes = {
  paginationModel: PropTypes.object,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default PageSort;


