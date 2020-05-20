import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";

import "./pagination.scss";

function PaginationComponent(props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);
  const totalPages = Math.ceil(parseInt(props.total)/props.pageSize);
  const totalPagesArray = Array(totalPages).fill().map((_, i) => i+1);

  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  const updatePageSize = (pageSize) => {
    setPageSize(pageSize.value);
  };

  const pageSizeList = [{
    label: "10 / page",
    value: 10
  }, {
    label: "20 / page",
    value: 20
  }, {
    label: "30 / page",
    value: 30
  }];

  useEffect(()=> {
    props.onClick(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (   
    <Row className="pagination-block justify-content-center">
      <Col xs={2} className="page-summary">Page {currentPage} / {totalPages} of {props.total} items</Col>
      <Col xs={6}>
        <Pagination>
          <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(0)[0])}>First</Pagination.Item>
          <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(currentPage - 1)}>Previous</Pagination.Item>
          {totalPagesArray.map((pageNumber) => {
            return <Pagination.Item active={pageNumber == currentPage} key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
          })}
          <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(currentPage + 1)}>Next</Pagination.Item>
          <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(-1)[0])}>Last</Pagination.Item>
        </Pagination>  
      </Col>
      <Col xs={2}>                  
        <DropdownList
          data={pageSizeList} 
          valueField='value'
          textField='label'
          defaultValue={pageSize}
          onChange={updatePageSize}             
        /></Col>
    </Row>
  );
}

PaginationComponent.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onClick: PropTypes.func.isRequired
};


export default PaginationComponent;