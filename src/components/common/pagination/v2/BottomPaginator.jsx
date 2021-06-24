import React from "react";
import PropTypes from "prop-types";
import {Pagination} from "react-bootstrap";
import {getResultSummary} from "components/common/pagination/pagination-helpers";

// TODO: Should we use the new paginator?
function BottomPaginator({ paginationModel, loadData, isLoading }) {
  const setPage = (page) => {
    if (page === paginationModel.getData("currentPage")) {
      return;
    }

    paginationModel.setData("currentPage", page);
    loadData(paginationModel);
  };

  const getTotalPages = () => {
    let pageSize = paginationModel.getData("pageSize");
    let totalCount = paginationModel.getData("totalCount");
    return Math.ceil(totalCount / pageSize);
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationModel.getData("currentPage");
    let startingPage = currentPage - 2 >= 1 ? currentPage - 2 : 1;

    for (let pageNumber = startingPage; pageNumber < startingPage + 5 && pageNumber <= getTotalPages(); pageNumber++) {
      paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }

    return paginationItems;
  };

  const getPaginator = () => {
    if (paginationModel.getData("totalCount") <= paginationModel.getData("pageSize") ) {
      return null;
    }

    const paginationDisabled = isLoading || paginationModel == null || paginationModel.getData("totalCount") == null || paginationModel.getData("totalCount") <= paginationModel.getData("pageSize");
    const onFirstPage = paginationModel?.getData("currentPage") === 1;
    const onLastPage = paginationModel?.getData("currentPage") === getTotalPages();

    return (
        <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(paginationModel?.getData("currentPage") - 1)}>Previous</Pagination.Item>
          {getPaginationItems()}
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(paginationModel?.getData("currentPage") + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(getTotalPages())}>Last</Pagination.Item>
        </Pagination>
    );
  };

  if (!paginationModel || paginationModel?.getData("totalCount") == null) {
    return null;
  }

  return (
    <div className="bottom-pagination">
      <div className="pagination-block small d-flex justify-content-between px-2">
        <div className="my-auto results-summary">{getResultSummary(paginationModel, isLoading)}</div>
        <div className="my-auto">
          {getPaginator()}
        </div>
        <div className="results-summary" />
      </div>
    </div>
  );
}

BottomPaginator.propTypes = {
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default BottomPaginator;