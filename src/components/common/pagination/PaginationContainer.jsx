import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import LoadingDialog from "components/common/status_notifications/loading";

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

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Data"} size={"sm"} />;
    }

    return (children);
  };

  if (filterDto == null) {
    return children;
  }

  return (
    <div className="pagination-container">
      {getTopPaginator()}
      {getBody()}
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