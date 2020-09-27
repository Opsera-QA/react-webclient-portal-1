import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";

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

function DtoPagination({paginationDto, setPaginationDto, loadData, location, total }) {
  const [totalPages, setTotalPages] = useState(undefined);
  // TODO Fix totalPagesArray
  const totalPagesArray = Array(19).fill().map((_, i) => i+1);
  const [pageWindowSize, setPageWindowSize] = useState(5);
  const [countOffset, setCountOffset] = useState(1);
  const [countOffsetUpper, setCountOffsetUpper] = useState(10);
  const pageSizeList = [25, 50, 100];

  //This is only needed because the component re-renders due to Loading component in the parent
  useEffect(()=> {
    let pageSize = paginationDto.getData("pageSize");
    let totalPages = Math.ceil(paginationDto.getData("totalCount") / pageSize);
    setTotalPages(totalPages);
    let currentPage = paginationDto.getData("currentPage");
    if(totalPages - currentPage === 0 || currentPage  === 1) {
      setPageWindowSize(5);
    }else if(currentPage <= 2 || (totalPages - currentPage) < 2) {
      setPageWindowSize(4);
    }else {
      setPageWindowSize(3);
    }

    const lowerResultsViewLimit = (currentPage - 1) * pageSize + 1;
    const upperResultsViewLimit = (lowerResultsViewLimit + pageSize) - 1;
    setCountOffset(lowerResultsViewLimit);
    setCountOffsetUpper((upperResultsViewLimit < total) ? upperResultsViewLimit : total);
  }, []);

  const gotoPage = (page) => {
    if(totalPages - page === 0 || page === 1) {
      setPageWindowSize(5);
    }else if(page <= 2 || (totalPages - page) < 2) {
      setPageWindowSize(4);
    }else {
      setPageWindowSize(3);
    }
    paginationDto.setData("currentPage", page);
    window.scrollTo(0, 50);
  };

  const updatePageSize = (pageSize) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("pageSize", pageSize);
    setPaginationDto({...paginationDto});
    loadData();
  };

  const updateSortOption = (sortOption) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("sortOption", sortOption);
    setPaginationDto({...paginationDto});
    loadData();
  };

  return (   
    <>
      { total > 10 ?
        <Row className="pagination-block small">
          <Col className="page-summary">Results {countOffset} - {countOffsetUpper} of {total}</Col>
          { location === "top" ?
            <>
              <Col></Col>
              <Col className="justify-content-right">
                <DropdownList
                  data={sortOptionList} 
                  valueField='value'
                  textField={sortObject => sortObject.text }
                  defaultValue={paginationDto.getData("sortOption")}
                  onChange={updateSortOption}             
                />
              </Col>
            </>
            : 
            <>
              <Col>
                <Pagination disabled={total < paginationDto.getData("pageSize")} className="justify-content-center">
                  <Pagination.Item disabled={paginationDto.getData("currentPage") <= totalPagesArray.slice(0)[0]} onClick={() => gotoPage(totalPagesArray.slice(0)[0])}>First</Pagination.Item>
                  <Pagination.Item disabled={paginationDto.getData("currentPage") <= totalPagesArray.slice(0)[0]} onClick={() => gotoPage(paginationDto.getData("currentPage") - 1)}>Previous</Pagination.Item>
                  {totalPagesArray.map((pageNumber, index) => {
                    if(paginationDto.getData("currentPage") < pageNumber && (pageNumber - paginationDto.getData("currentPage")) < pageWindowSize) {
                      return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else if(paginationDto.getData("currentPage") > pageNumber &&  paginationDto.getData("currentPage") - pageNumber < pageWindowSize) {
                      return <Pagination.Item key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else if(paginationDto.getData("currentPage") === pageNumber){
                      return <Pagination.Item disabled={paginationDto.getData("currentPage") >= totalPagesArray.slice(-1)[0]} active={pageNumber === paginationDto.getData("currentPage")} key={pageNumber} onClick={() => gotoPage(pageNumber)}>{pageNumber}</Pagination.Item>;
                    }else {
                      return null;
                    }
                  })}
                  <Pagination.Item disabled={paginationDto.getData("currentPage") >= totalPagesArray.slice(-1)[0]} onClick={() => gotoPage(paginationDto.getData("currentPage") + 1)}>Next</Pagination.Item>
                  <Pagination.Item disabled={paginationDto.getData("currentPage") >= totalPagesArray.slice(-1)[0]} onClick={() => gotoPage(totalPagesArray.slice(-1)[0])}>Last</Pagination.Item>
                </Pagination>  
              </Col>
              <Col className="justify-content-right">
                <DropdownList
                  data={pageSizeList} 
                  valueField='value'
                  textField={item => item + " results per page"}
                  defaultValue={paginationDto.getData("pageSize")}
                  onChange={updatePageSize}             
                /></Col>
            </> }
        </Row> : null }
    </>
  );
}

DtoPagination.propTypes = {
  paginationDto: PropTypes.object,
  total: PropTypes.number,
  location: PropTypes.string,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func
};

DtoPagination.defaultProps = {
  sortOption: { name: "createdAt", text: "Newest", order: -1 },
}

export default DtoPagination;