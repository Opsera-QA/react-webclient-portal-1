import React from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import {createPageSortOptions} from "components/common/filters/filterHelpers";

function PageSort({ paginationDto, setPaginationDto, loadData, isLoading}) {
  const updateSortOption = (sortOption) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("sortOption", sortOption);
    setPaginationDto({...paginationDto});
    loadData(paginationDto);
  };

  if (paginationDto.getMetaData()["sortOptions"] == null) {
   return <></>;
  }

  return (
    <div className="page-sort">
      <DropdownList
        data={createPageSortOptions(paginationDto.getMetaData()["sortOptions"], "Sort", "text")}
        valueField={"key"}
        textField={"text"}
        busy={isLoading}
        // filter={filter}
        value={paginationDto.getData("sortOption")}
        placeholder={"Sort Page"}
        onChange={sortOption => updateSortOption(sortOption)}
      />
    </div>
  );
}

PageSort.propTypes = {
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default PageSort;


