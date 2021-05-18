import React from "react";
import PropTypes from "prop-types";
import PageSort from "./page_options/PageSort";
import {getResultSummary} from "./pagination-helpers";
import PageSizeSelectInput from "components/common/pagination/page_options/PageSizeSelectInput";

function TopPaginator({paginationModel, setPaginationModel, loadData, isLoading, pageSizeList, showPageSort, showPageSize }) {
  if (!paginationModel) {
    return null;
  }

  return (
    <div className={"top-pagination py-2 w-100"}>
      <div className="px-2 d-flex">
        <div className="small my-auto">{getResultSummary(paginationModel, isLoading)}</div>
        <div className="d-flex ml-auto">
          <div>
            <PageSort
              paginationDto={paginationModel}
              setPaginationDto={setPaginationModel}
              loadData={loadData}
              isLoading={isLoading}
              showPageSort={showPageSort}
            />
          </div>
          <div className="ml-2">
            <PageSizeSelectInput
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              pageSizeList={pageSizeList}
              loadData={loadData}
              isLoading={isLoading}
              showPageSize={showPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

TopPaginator.propTypes = {
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  pageSizeList: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  showPageSort: PropTypes.bool,
  showPageSize: PropTypes.bool
};

export default TopPaginator;