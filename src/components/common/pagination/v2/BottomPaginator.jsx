import React from "react";
import PropTypes from "prop-types";
import {Pagination} from "react-bootstrap";
import {getResultSummary} from "components/common/pagination/pagination-helpers";
import ResultsSummary from "components/common/pagination/v2/ResultsSummary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// TODO: Should we use the new paginator?
function BottomPaginator({ paginationModel, nextGeneration, loadData, isLoading }) {
  const setPage = (page) => {
    if (page === paginationModel.getFilterValue("currentPage")) {
      return;
    }

    paginationModel.setData("currentPage", page);
    loadData(paginationModel);
  };

  const getTotalPages = () => {
    let pageSize = paginationModel.getFilterValue("pageSize");
    let totalCount = paginationModel.getFilterValue("totalCount");
    return Math.ceil(totalCount / pageSize);
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationModel.getFilterValue("currentPage");
    let startingPage = currentPage - 2 >= 1 ? currentPage - 2 : 1;

    for (let pageNumber = startingPage; pageNumber < startingPage + 5 && pageNumber <= getTotalPages(); pageNumber++) {
      paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }

    return paginationItems;
  };

  const getPaginator = () => {
    const totalCount = paginationModel?.getFilterValue("totalCount");
    const pageSize = paginationModel?.getFilterValue("pageSize");
    const currentPage = paginationModel?.getFilterValue("currentPage");

    if (totalCount <= pageSize) {
      return null;
    }

    const paginationDisabled = isLoading || paginationModel == null || totalCount == null || totalCount <= pageSize;
    const onFirstPage = currentPage === 1;
    const onLastPage = currentPage === getTotalPages();

    return (
        <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(currentPage - 1)}>Previous</Pagination.Item>
          {getPaginationItems()}
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(currentPage + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(getTotalPages())}>Last</Pagination.Item>
        </Pagination>
    );
  };

  const getResultSummaryField = () => {
    // TODO: This is a workaround until everything is up to date with current standards
    if (nextGeneration === true) {
      return (<ResultsSummary isLoading={isLoading} paginationModel={paginationModel} />);
    }

    return (getResultSummary(paginationModel, isLoading));
  };

  if (!paginationModel || paginationModel?.getFilterValue("totalCount") == null) {
    return null;
  }

  return (
    <div className="bottom-pagination">
      <Row className="pagination-block small d-flex justify-content-between px-2">
        <Col xs={4} className="my-auto results-summary">
          {getResultSummaryField()}
        </Col>
        <Col xs={4} className="my-auto">
          {getPaginator()}
        </Col>
        <Col xs={4} />
      </Row>
    </div>
  );
}

BottomPaginator.propTypes = {
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  nextGeneration: PropTypes.bool,
};

export default BottomPaginator;