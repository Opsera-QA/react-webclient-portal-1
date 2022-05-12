import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function PageSize({ paginationDto, setPaginationDto, loadData, isLoading, pageSizeList}) {
  const updatePageSize = (fieldName, pageSize) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("pageSize", pageSize);
    setPaginationDto({...paginationDto});
    loadData(paginationDto);
  };

  const formatText = (item) => {
    return item + " results per page";
  };

  if (loadData == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      selectOptions={pageSizeList}
      inline={true}
      showLabel={false}
      dataObject={paginationDto}
      setDataObject={setPaginationDto}
      fieldName={"pageSize"}
      valueField='value'
      textField={formatText}
      disabled={isLoading || paginationDto?.getData("totalCount") == null}
      placeholder={"Sort Page"}
      setDataFunction={updatePageSize}
    />
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


