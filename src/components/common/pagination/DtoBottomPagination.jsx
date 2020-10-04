import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";

function DtoBottomPagination({paginationDto, setPaginationDto, loadData, isLoading }) {
  const [totalPages, setTotalPages] = useState(undefined);

  useEffect(()=> {
    let pageSize = paginationDto.getData("pageSize");
    let totalCount = paginationDto.getData("totalCount");
    let totalPages = Math.ceil(totalCount / pageSize);
    setTotalPages(totalPages);
  }, []);

  const setPage = (page) => {
    if (page === paginationDto.getData("currentPage")) {
      return;
    }

    paginationDto.setData("currentPage", page);
    setPaginationDto({...paginationDto});
    loadData();
    window.scrollTo(0, 50);
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationDto.getData("currentPage");
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }
    return paginationItems;
  };

  const getResultSummary = () => {
    const lowerResultsViewLimit = ((paginationDto.getData("currentPage") - 1) * paginationDto.getData("pageSize")) + 1;
    const upperResultsViewLimit = (lowerResultsViewLimit + paginationDto.getData("pageSize")) - 1;
    let countOffsetUpper = (upperResultsViewLimit < paginationDto.getData("totalCount")) ? upperResultsViewLimit : paginationDto.getData("totalCount");
    return (<Col sm={4} className="page-summary">Results {lowerResultsViewLimit} - {countOffsetUpper} of {paginationDto.getData("totalCount")}</Col>);
  };

  // TODO: Should we just always show pagination but disable it if irrelevant?
  if (paginationDto.getData("totalCount") < 10 ) {
    return null;
  }

  return (
    <Row className="pagination-block small">
      {getResultSummary()}
      <Col sm={4}>
        <Pagination disabled={isLoading || paginationDto.getData("totalCount") < paginationDto.getData("pageSize")}
                    className="justify-content-center">
          <Pagination.Item disabled={isLoading || paginationDto.getData("currentPage") === 1}
                           onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={isLoading || paginationDto.getData("currentPage") === 1}
                           onClick={() => setPage(paginationDto.getData("currentPage") - 1)}>Previous</Pagination.Item>
          {getPaginationItems()}
          <Pagination.Item disabled={isLoading || paginationDto.getData("currentPage") === totalPages}
                           onClick={() => setPage(paginationDto.getData("currentPage") + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={isLoading || paginationDto.getData("currentPage") === totalPages}
                           onClick={() => setPage(totalPages)}>Last</Pagination.Item>
        </Pagination>
      </Col>
      <Col sm={4} />
    </Row>
  );
}

DtoBottomPagination.propTypes = {
  paginationDto: PropTypes.object,
  total: PropTypes.number,
  location: PropTypes.string,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default DtoBottomPagination;