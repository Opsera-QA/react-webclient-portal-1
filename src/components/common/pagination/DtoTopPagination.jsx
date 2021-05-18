import React from "react";
import PropTypes from "prop-types";
import PageSort from "./page_options/PageSort";
import PageSize from "./page_options/PageSize";
import {getResultSummary} from "./pagination-helpers";

// TODO: Rename
function DtoTopPagination({paginationDto, setPaginationDto, loadData, isLoading, pageSizeList }) {
  if (!paginationDto) {
    return null;
  }

  return (
    <div className={"top-pagination py-2 w-100"}>
      <div className="px-2 d-flex">
        <div className="small my-auto">{getResultSummary(paginationDto, isLoading)}</div>
        <div className="d-flex ml-auto">
          <div><PageSort paginationDto={paginationDto} setPaginationDto={setPaginationDto} loadData={loadData} isLoading={isLoading} /></div>
          <div className="ml-2"><PageSize paginationDto={paginationDto} setPaginationDto={setPaginationDto} pageSizeList={pageSizeList} loadData={loadData}  isLoading={isLoading} /></div>
        </div>
      </div>
    </div>
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
  pageSizeList: [5, 10, 25, 50, 100]
};

export default DtoTopPagination;