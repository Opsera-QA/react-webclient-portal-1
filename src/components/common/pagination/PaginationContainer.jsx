import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";

function PaginationContainer({ isLoading, filterDto, setFilterDto, loadData, children, scrollOnLoad }) {
  const getTopPaginator = () => {
    return (
      <DtoTopPagination
        paginationDto={filterDto}
        setPaginationDto={setFilterDto}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  const getBottomPaginator = () => {
    return (
      <DtoBottomPagination
        scrollOnLoad={scrollOnLoad}
        paginationDto={filterDto}
        setPaginationDto={setFilterDto}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  return (
    <div className="pagination-container">
      {getTopPaginator()}
      {children}
      {getBottomPaginator()}
    </div>
  );
}

PaginationContainer.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  children: PropTypes.any,
  loadData: PropTypes.func,
  scrollOnLoad: PropTypes.bool
};

export default PaginationContainer;