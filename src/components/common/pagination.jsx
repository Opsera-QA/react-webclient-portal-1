import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";

import "./pagination.css";
//import "./pagination.scss";  "node-sass": "^4.14.1",

function PaginationComponent(props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 25);
  const totalPages = Math.ceil(parseInt(props.total)/props.pageSize);
  const totalPagesArray = Array(totalPages).fill().map((_, i) => i+1);
  const [pageWindowSize, setPageWindowSize] = useState(5);
  const [countOffset, setCountOffset] = useState(1);

  const gotoPage = (page) => {
    if(totalPages - page == 0 || page == 1) {
      setPageWindowSize(5);
    }else if(page <= 2 || (totalPages - page) < 2) {
      setPageWindowSize(4);
    }else {
      setPageWindowSize(3);
    }
    setCurrentPage(page);
    window.scrollTo(0, 50);
  };

  const updatePageSize = (pageSize) => {
    setCurrentPage(1);
    setPageSize(pageSize);
  };

  const pageSizeList = [25, 50, 100];

  useEffect(()=> {
    props.onClick(currentPage, pageSize);
  }, [currentPage, pageSize]);
  
  //This is only needed because the component re-renders due to Loading component in the parent 
  useEffect(()=> {
    if(totalPages - currentPage == 0 || currentPage == 1) {
      setPageWindowSize(5);
    }else if(currentPage <= 2 || (totalPages - currentPage) < 2) {
      setPageWindowSize(4);
    }else {
      setPageWindowSize(3);
    }

    setCountOffset((currentPage - 1) * props.pageSize + 1);    
  }, [currentPage]);

  return (   
    <>
      { props.total > props.pageSize ?
        <Row className="pagination-block small mb-4">
          <Col xs={3} className="page-summary">Results {countOffset} - {(countOffset + props.pageSize) - 1} of {props.total}</Col>
          <Col xs={6}>
            <Pagination className="justify-content-center">
              <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(0)[0])}>First</Pagination.Item>
              <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(currentPage - 1)}>Previous</Pagination.Item>
              {totalPagesArray.map((pageNumber, index) => {
                if(currentPage < pageNumber && (pageNumber - currentPage) < pageWindowSize) {
                  return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                }else if(currentPage > pageNumber &&  currentPage - pageNumber < pageWindowSize) {
                  return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                }else if(currentPage === pageNumber){
                  return <Pagination.Item active={pageNumber == currentPage} key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                }else {
                  return null;
                }
              })}
              <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(currentPage + 1)}>Next</Pagination.Item>
              <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(-1)[0])}>Last</Pagination.Item>
            </Pagination>  
          </Col>
          <Col xs={3} className="justify-content-right">     
            <DropdownList
              data={pageSizeList} 
              valueField='value'
              textField={item => item + " results per page"}
              defaultValue={pageSize}
              onChange={updatePageSize}             
            /></Col>
        </Row> : null }
    </>
  );
}

PaginationComponent.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onClick: PropTypes.func.isRequired
};


export default PaginationComponent;