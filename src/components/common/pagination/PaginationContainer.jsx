import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";

function PaginationContainer({ isLoading, filterDto, setFilterDto, loadData, children }) {
  const getTopPaginator = () => {
    if (filterDto && filterDto.getData("totalCount") != null) {
      return (
        <div className="top-pagination pt-1 px-3">
          <DtoTopPagination
            paginationDto={filterDto}
            setPaginationDto={setFilterDto}
            isLoading={isLoading}
            loadData={loadData}
          />
        </div>
      );
    }
  };

  const getBottomPaginator = () => {
    if (filterDto && filterDto.getData("totalCount") != null) {
      return (
        <div className="px-2 py-1 table-footer">
          <DtoBottomPagination
            paginationDto={filterDto}
            setPaginationDto={setFilterDto}
            isLoading={isLoading}
            loadData={loadData}
          />
        </div>
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