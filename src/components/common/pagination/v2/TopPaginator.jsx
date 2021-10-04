import React from "react";
import PropTypes from "prop-types";
import PageSizeSelectInput from "components/common/pagination/page_options/PageSizeSelectInput";
import PageSortSelectInput from "components/common/pagination/page_options/PageSortSelectInput";
import ResultsSummary from "components/common/pagination/v2/ResultsSummary";

function TopPaginator({paginationModel, loadData, isLoading}) {
  if (paginationModel == null) {
    return null;
  }

  return (
    <div className={"top-pagination py-2 w-100"}>
      <div className="px-2 d-flex">
        <div className="my-auto small">
          <ResultsSummary isLoading={isLoading} paginationModel={paginationModel} />
        </div>
        <div className="d-flex ml-auto">
          <PageSortSelectInput paginationModel={paginationModel} loadData={loadData} isLoading={isLoading} className={"ml-2"}/>
          <PageSizeSelectInput paginationModel={paginationModel} loadData={loadData} isLoading={isLoading} className={'ml-2'}/>
        </div>
      </div>
    </div>
  );
}

TopPaginator.propTypes = {
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default TopPaginator;