import React from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

function PageSize({ paginationDto, setPaginationDto, loadData, isLoading, pageSizeList}) {
  const updatePageSize = (pageSize) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("pageSize", pageSize);
    setPaginationDto({...paginationDto});
    loadData(paginationDto);
  };

  return (
    <div className="page-size">
      <DropdownList
        data={pageSizeList}
        disabled={isLoading || paginationDto?.getData("totalCount") == null}
        valueField='value'
        textField={item => item + " results per page"}
        defaultValue={paginationDto.getData("pageSize")}
        onChange={updatePageSize}
      />
    </div>
  );
}

PageSize.propTypes = {
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  pageSizeList: PropTypes.array
};

export default PageSize;


