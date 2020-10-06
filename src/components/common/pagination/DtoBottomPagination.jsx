import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";
import {getResultSummary} from "./pagination-helpers";

function DtoBottomPagination({ paginationDto, setPaginationDto, loadData, isLoading }) {
  const setPage = (page) => {
    if (page === paginationDto.getData("currentPage")) {
      return;
    }

    paginationDto.setData("currentPage", page);
    setPaginationDto({...paginationDto});
    loadData();
    window.scrollTo(0, 50);
  };

  const getTotalPages = () => {
    let pageSize = paginationDto.getData("pageSize");
    let totalCount = paginationDto.getData("totalCount");
    let totalPages = Math.ceil(totalCount / pageSize);
    return totalPages;
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationDto.getData("currentPage");
    for (let pageNumber = 1; pageNumber <= getTotalPages(); pageNumber++) {
        paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }
    return paginationItems;
  };

  const getPaginator = () => {
    if (paginationDto.getData("totalCount") <= paginationDto.getData("pageSize") ) {
      return null;
    }

    let paginationDisabled = isLoading || paginationDto.getData("totalCount") <= paginationDto.getData("pageSize");

    return (
      <Col sm={4} className="my-auto">
        <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
          <Pagination.Item disabled={paginationDisabled} onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={paginationDisabled} onClick={() => setPage(paginationDto.getData("currentPage") - 1)}>Previous</Pagination.Item>
          {getPaginationItems()}
          <Pagination.Item disabled={paginationDisabled} onClick={() => setPage(paginationDto.getData("currentPage") + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={paginationDisabled} onClick={() => setPage(getTotalPages())}>Last</Pagination.Item>
        </Pagination>
      </Col>
    )
  };

  return (
    <Row className="pagination-block small">
      <Col sm={4} className="my-auto">{getResultSummary(paginationDto)}</Col>
      {getPaginator()}
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