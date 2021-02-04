import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";

function PaginationContainer({ isLoading, filterDto, setFilterDto, loadData, children }) {
  const getTopPaginator = () => {
    if (filterDto && filterDto.getData("totalCount") != null) {
      return (
        <DtoTopPagination
          paginationDto={filterDto}
          setPaginationDto={setFilterDto}
          isLoading={isLoading}
          loadData={loadData}
        />
      );
    }
  };

  const getBottomPaginator = () => {
    if (filterDto && filterDto.getData("totalCount") != null) {
      return (
        <DtoBottomPagination
          paginationDto={filterDto}
          setPaginationDto={setFilterDto}
          isLoading={isLoading}
          loadData={loadData}
        />
      );
    }
  };

  if (filterDto == null) {
    return children;
  }

  // TODO: add styling 
  return (
    <>
      <div className="px-2">{getTopPaginator()}</div>
      {children}
      <div className="px-2">{getBottomPaginator()}</div>
    </>
  );
}

PaginationContainer.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  children: PropTypes.any,
  loadData: PropTypes.func
};

export default PaginationContainer;