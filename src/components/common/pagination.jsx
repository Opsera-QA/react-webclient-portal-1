import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";

import "./pagination.css";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
//import "./pagination.scss";  "node-sass": "^4.14.1",

export const sortOptionList = [
  { name: "createdAt", text: "Newest Pipelines", order: -1 },
  { name: "createdAt", text: "Oldest Pipelines", order: 1 },
  { name: "name", text: "Pipeline Name (a-z)", order: 1 },
  { name: "name", text: "Pipeline Name (z-a)", order: -1 },
  { name: "updatedAt", text: "Updated (latest)", order: -1 },
  { name: "updatedAt", text: "Updated (earliest)", order: 1 },
];

export const getSortOptionByText = (text) => {
  return sortOptionList.find(sortOption => sortOption.text === text);
};

// TODO: This needs to be deleted
function PaginationComponent(props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const location = props.location || "bottom";
  const [sortOption, setSortOption] = useState(props.sortOption || { name: "createdAt", text: "Newest", order: -1 });
  const [pageSize, setPageSize] = useState(props.pageSize || 25);
  const totalPages = Math.ceil(parseInt(props.total)/props.pageSize);
  const totalPagesArray = Array(totalPages).fill().map((_, i) => i+1);
  const [pageWindowSize, setPageWindowSize] = useState(5);
  const [countOffset, setCountOffset] = useState(1);
  const [countOffsetUpper, setCountOffsetUpper] = useState(10);

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

  const updateSortOption = (sortOption) => {
    setCurrentPage(1);
    setSortOption(sortOption);
  };

  const pageSizeList = [25, 50, 100];

  useEffect(()=> {
    props.onClick(currentPage, pageSize, sortOption);
  }, [currentPage, pageSize, sortOption]);
  
  //This is only needed because the component re-renders due to Loading component in the parent 
  useEffect(()=> {
    if(totalPages - currentPage == 0 || currentPage == 1) {
      setPageWindowSize(5);
    }else if(currentPage <= 2 || (totalPages - currentPage) < 2) {
      setPageWindowSize(4);
    }else {
      setPageWindowSize(3);
    }

    const lowerResultsViewLimit = (currentPage - 1) * props.pageSize + 1;
    const upperResultsViewLimit = (lowerResultsViewLimit + props.pageSize) - 1;
    setCountOffset(lowerResultsViewLimit); 
    setCountOffsetUpper((upperResultsViewLimit < props.total) ? upperResultsViewLimit : props.total);
  }, [currentPage]);

  return (   
    <>
      { props.total > 10 ?
        <Row className="pagination-block small">
          <Col className="page-summary">Results {countOffset} - {countOffsetUpper} of {props.total}</Col>
          { location === "top" ?
            <>
              <Col></Col>
              <Col className="justify-content-right">
                <StandaloneSelectInput
                  selectOptions={sortOptionList}
                  valueField='value'
                  textField={sortObject => sortObject.text }
                  defaultValue={sortOption}
                  setDataFunction={updateSortOption}
                />
              </Col>
            </>
            : 
            <>
              <Col>
                <Pagination disabled={props.total < props.pageSize} className="justify-content-center">
                  <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(0)[0])}>First</Pagination.Item>
                  <Pagination.Item  disabled={currentPage > totalPagesArray.slice(0)[0] ? false : true} onClick={() => gotoPage(currentPage - 1)}>Previous</Pagination.Item>
                  {totalPagesArray.map((pageNumber, index) => {
                    if(currentPage < pageNumber && (pageNumber - currentPage) < pageWindowSize) {
                      return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else if(currentPage > pageNumber &&  currentPage - pageNumber < pageWindowSize) {
                      return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else if(currentPage === pageNumber){
                      return <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} active={pageNumber == currentPage} key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else {
                      return null;
                    }
                  })}
                  <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(currentPage + 1)}>Next</Pagination.Item>
                  <Pagination.Item disabled={currentPage < totalPagesArray.slice(-1)[0] ? false : true} onClick={() => gotoPage(totalPagesArray.slice(-1)[0])}>Last</Pagination.Item>
                </Pagination>  
              </Col>
              <Col className="justify-content-right">
                <StandaloneSelectInput
                  selectOptions={pageSizeList}
                  valueField='value'
                  textField={item => item + " results per page"}
                  defaultValue={pageSize}
                  setDataFunction={updatePageSize}
                /></Col>
            </> }
        </Row> : null }
    </>
  );
}

PaginationComponent.propTypes = {
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  location: PropTypes.string,
  sortOption: PropTypes.object
};


export default PaginationComponent;