import React from "react";
import PropTypes from "prop-types";
import {Col, Pagination, Row} from "react-bootstrap";
import {getResultSummary} from "./pagination-helpers";
import IconBase from "../icons/IconBase";
import { faChevronLeft, faChevronRight, faChevronsLeft, faChevronsRight } from "@fortawesome/pro-solid-svg-icons";

function DtoBottomPagination({ paginationDto, setPaginationDto, paginationStyle, loadData, isLoading, scrollOnLoad }) {
  const setPage = (page) => {
    if (page === paginationDto.getData("currentPage")) {
      return;
    }

    paginationDto.setData("currentPage", page);
    setPaginationDto({...paginationDto});
    loadData();

    if (scrollOnLoad !== false) {
      window.scrollTo(0, 50);
    }
  };

  const getTotalPages = () => {
    let pageSize = paginationDto.getData("pageSize");
    let totalCount = paginationDto.getData("totalCount");
    return Math.ceil(totalCount / pageSize);
  };

  const getPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationDto.getData("currentPage");
    let startingPage = currentPage - 2 >= 1 ? currentPage - 2 : 1;

    for (let pageNumber = startingPage; pageNumber < startingPage + 5 && pageNumber <= getTotalPages(); pageNumber++) {
      paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }

    return paginationItems;
  };

  const getStackedVerticalPaginationItems = () => {
    let paginationItems = [];
    let currentPage = paginationDto.getData("currentPage");
    let startingPage = currentPage - 2 >= 1 ? currentPage - 2 : 1;

    for (let pageNumber = startingPage; pageNumber < startingPage + 1 && pageNumber <= getTotalPages(); pageNumber++) {
      paginationItems.push(<Pagination.Item disabled={isLoading} active={pageNumber === currentPage} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</Pagination.Item>);
    }

    return paginationItems;
  };

  const getPaginator = () => {
    if (paginationDto.getData("totalCount") <= paginationDto.getData("pageSize") ) {
      return null;
    }

    const paginationDisabled = isLoading || paginationDto == null || paginationDto.getData("totalCount") == null || paginationDto.getData("totalCount") <= paginationDto.getData("pageSize");
    const onFirstPage = paginationDto?.getData("currentPage") === 1;
    const onLastPage = paginationDto?.getData("currentPage") === getTotalPages();

    return (
        <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(1)}>First</Pagination.Item>
          <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(paginationDto?.getData("currentPage") - 1)}>Previous</Pagination.Item>
          {getPaginationItems()}
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(paginationDto?.getData("currentPage") + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(getTotalPages())}>Last</Pagination.Item>
        </Pagination>
    );
  };

  const getStackedVerticalPaginator = () => {
    if (paginationDto.getData("totalCount") <= paginationDto.getData("pageSize") ) {
      return null;
    }

    const paginationDisabled = isLoading || paginationDto == null || paginationDto.getData("totalCount") == null || paginationDto.getData("totalCount") <= paginationDto.getData("pageSize");
    const onFirstPage = paginationDto?.getData("currentPage") === 1;
    const onLastPage = paginationDto?.getData("currentPage") === getTotalPages();

    return (
      <Pagination disabled={paginationDisabled} className="justify-content-center my-1">
        <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(1)}><IconBase icon={faChevronsLeft} iconSize={"sm"}/></Pagination.Item>
        <Pagination.Item disabled={onFirstPage || paginationDisabled} onClick={() => setPage(paginationDto?.getData("currentPage") - 1)}><IconBase icon={faChevronLeft} iconSize={"sm"}/></Pagination.Item>
        {getStackedVerticalPaginationItems()}
        <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(paginationDto?.getData("currentPage") + 1)}><IconBase icon={faChevronRight} iconSize={"sm"}/></Pagination.Item>
        <Pagination.Item disabled={onLastPage || paginationDisabled} onClick={() => setPage(getTotalPages())}><IconBase icon={faChevronsRight} iconSize={"sm"}/></Pagination.Item>
      </Pagination>
    );
  };

  if (!paginationDto || paginationDto?.getData("totalCount") == null) {
    return null;
  }

  if (paginationStyle === "stacked") {
    return (
      <div className="bottom-pagination" style={{flex: "0 0 auto"}}>
        <Row className="pagination-block small">
          <Col sm={12} className="my-auto text-center">{getResultSummary(paginationDto, isLoading)}</Col>
          <Col sm={12} className="my-auto">
            {getPaginator()}
          </Col>
        </Row>
      </div>
    );
  }

  if (paginationStyle === "stackedVerticalTab") {
    return (
      <div className="bottom-pagination stacked-vertical-tab" style={{flex: "0 0 auto"}}>
        <Row className="pagination-block small px-2">
          <Col sm={12} className="mb-1 text-center">{getResultSummary(paginationDto, isLoading)}</Col>
          <Col sm={12} className="mb-1">
            {getStackedVerticalPaginator()}
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="bottom-pagination" style={{flex: "0 0 auto"}}>
      <div className="pagination-block small d-flex justify-content-between px-2">
        <div className="my-auto results-summary">{getResultSummary(paginationDto, isLoading)}</div>
        <div className="my-auto">
          {getPaginator()}
        </div>
        <div className="results-summary" />
      </div>
    </div>
  );
}

DtoBottomPagination.propTypes = {
  paginationDto: PropTypes.object,
  total: PropTypes.number,
  location: PropTypes.string,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  paginationStyle: PropTypes.string,
  isLoading: PropTypes.bool,
  scrollOnLoad: PropTypes.bool
};

DtoBottomPagination.defaultProps = {
  scrollOnLoad: true
};

export default DtoBottomPagination;