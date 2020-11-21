import React from "react";
import PropTypes from "prop-types";
import PageSort from "./page_options/PageSort";
import PageSize from "./page_options/PageSize";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getResultSummary} from "./pagination-helpers";

function DtoTopPagination({paginationDto, setPaginationDto, loadData, isLoading, pageSizeList }) {
  return (
    <Row className="small mb-1">
      <Col className="px-0"><div className="mt-1 ml-2">{getResultSummary(paginationDto)}</div></Col>
      <Col className="px-0" sm={2}><PageSort paginationDto={paginationDto} setPaginationDto={setPaginationDto} loadData={loadData} /></Col>
      <Col className="px-0" sm={2}><PageSize paginationDto={paginationDto} setPaginationDto={setPaginationDto} pageSizeList={pageSizeList} loadData={loadData} /></Col>
    </Row>
  );
}

DtoTopPagination.propTypes = {
  paginationDto: PropTypes.object,
  pageSizeList: PropTypes.array,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

DtoTopPagination.defaultProps = {
  pageSizeList: [25, 50, 100]
}

export default DtoTopPagination;