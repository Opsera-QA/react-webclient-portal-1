import React from "react";
import PropTypes from "prop-types";
import PageSort from "./page_options/PageSort";
import PageSize from "./page_options/PageSize";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function DtoTopPagination({paginationDto, setPaginationDto, loadData, isLoading, pageSizeList }) {
  const getResultSummary = () => {
    const lowerResultsViewLimit = ((paginationDto.getData("currentPage") - 1) * paginationDto.getData("pageSize")) + 1;
    const upperResultsViewLimit = (lowerResultsViewLimit + paginationDto.getData("pageSize")) - 1;
    let countOffsetUpper = (upperResultsViewLimit < paginationDto.getData("totalCount")) ? upperResultsViewLimit : paginationDto.getData("totalCount");
    return (<div>Results {lowerResultsViewLimit} - {countOffsetUpper} of {paginationDto.getData("totalCount")}</div>);
  };

  return (
    <Row className="small mb-1">
      <Col><div className="mt-1 ml-2">{getResultSummary()}</div></Col>
      <Col className="px-0" sm={2}><PageSort paginationDto={paginationDto} setPaginationDto={setPaginationDto} loadData={loadData} /></Col>
      <Col className="pl-0" sm={2}><PageSize paginationDto={paginationDto} setPaginationDto={setPaginationDto} pageSizeList={pageSizeList} loadData={loadData} /></Col>
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