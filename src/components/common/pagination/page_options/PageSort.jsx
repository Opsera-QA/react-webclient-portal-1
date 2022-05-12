import React from "react";
import PropTypes from "prop-types";
import {createPageSortOptions} from "components/common/filters/filterHelpers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSort({ paginationDto, setPaginationDto, loadData, isLoading}) {
  const updateSortOption = (fieldName, sortOption) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("sortOption", sortOption);
    setPaginationDto({...paginationDto});
    loadData(paginationDto);
  };

  if (paginationDto?.getFieldById("sortOption") == null || paginationDto?.getMetaData()?.sortOptions == null || loadData == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      dataObject={paginationDto}
      setDataObject={setPaginationDto}
      fieldName={"sortOption"}
      showLabel={false}
      inline={true}
      selectOptions={createPageSortOptions(paginationDto?.getMetaData()["sortOptions"], "Sort", "text")}
      valueField={"key"}
      textField={"text"}
      disabled={isLoading || paginationDto?.getData("totalCount") == null}
      placeholder={"Sort Page"}
      setDataFunction={updateSortOption}
    />
  );
}

PageSort.propTypes = {
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default PageSort;


