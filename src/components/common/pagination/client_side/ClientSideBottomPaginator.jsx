import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Col, Pagination, Row} from "react-bootstrap";

function ClientSideBottomPaginator({ items, pageSize, paginationStyle, setShownItems, isLoading, showPageNumbers }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setUpPaginator();
  }, [items]);

  const setUpPaginator = () => {
    setPaginationItems(1);
  };

  const getTotalPages = () => {
    let totalCount = items.length;
    return Math.ceil(totalCount / pageSize);
  };

  const getPageNumbers = () => {
    if (!showPageNumbers) {
      return;
    }

    let paginationItems = [];
    let startingPage = currentPage - 2 >= 1 ? currentPage - 2 : 1;

    for (let pageNumber = startingPage; pageNumber < startingPage + 5 && pageNumber <= getTotalPages(); pageNumber++) {
      paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }

    return paginationItems;
  };

  const setPage = (newPage) => {
    if (newPage === currentPage) {
      return;
    }

    setPaginationItems(newPage);
    setCurrentPage(newPage);
  };

  const setPaginationItems = (newPage) => {
    const startIndex = ((newPage - 1) * pageSize);
    const endIndex = startIndex + pageSize;
    const shownItems = items.slice(startIndex, endIndex);
    setShownItems([...shownItems]);
  };

  const getPaginator = () => {
    const paginationDisabled = isLoading || items.length <= pageSize;
    const onFirstPage = currentPage === 1;
    const onLastPage = currentPage === getTotalPages();

    return (
        <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(currentPage - 1)}>Previous</Pagination.Item>
          {getPageNumbers()}
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(currentPage + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(getTotalPages())}>Last</Pagination.Item>
        </Pagination>
    )
  };

  const getPageSummary = () => {
    if (items.length === 0) {
      return (<div><span>Results 0 - 0 of 0</span></div>);
    }

    const lowerResultsViewLimit = (currentPage - 1) * pageSize + 1;
    const upperResultsViewLimit = lowerResultsViewLimit + pageSize - 1;
    let countOffsetUpper = (upperResultsViewLimit < items.length) ? upperResultsViewLimit : items.length;
    return (<div><span>Results {lowerResultsViewLimit} - {countOffsetUpper} of {items.length}</span></div>);
  };

  if (paginationStyle === "stacked") {
    return (
      <Row className="pagination-block small">
        <Col sm={12} className="my-auto text-center">{getPageSummary()}</Col>
        <Col sm={12} className="my-auto">
          {getPaginator()}
        </Col>
      </Row>
    )
  }

  return (
    <Row className="pagination-block small">
      <Col sm={4} className="my-auto">{getPageSummary()}</Col>
      <Col sm={4} className="my-auto">
        {getPaginator()}
      </Col>
      <Col sm={4}/>
    </Row>
  );
}

ClientSideBottomPaginator.propTypes = {
  items: PropTypes.array,
  loadData: PropTypes.func,
  setShownItems: PropTypes.func,
  pageSize: PropTypes.number,
  paginationStyle: PropTypes.string,
  showPageNumbers: PropTypes.bool,
  isLoading: PropTypes.bool
};

ClientSideBottomPaginator.defaultProps = {
  pageSize: 10,
  showPageNumbers: true
};

export default ClientSideBottomPaginator;