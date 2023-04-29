import React from "react";
import PropTypes from "prop-types";
import TopPaginator from "components/common/pagination/v2/TopPaginator";
import BottomPaginator from "components/common/pagination/v2/BottomPaginator";

function VanityPaginationContainer(
  {
    isLoading,
    paginationModel,
    loadData,
    children,
    containerHeight,
  }) {
  if (paginationModel == null || paginationModel?.showPagination() === false || loadData == null) {
    return children;
  }

  return (
    <div
      className={"pagination-container"}
      style={{
        minHeight: containerHeight,
      }}
    >
      <TopPaginator
        paginationModel={paginationModel}
        isLoading={isLoading}
        loadData={loadData}
      />
      {children}
      <BottomPaginator
        nextGeneration={true}
        loadData={loadData}
        isLoading={isLoading}
        paginationModel={paginationModel}
      />
    </div>
  );
}

VanityPaginationContainer.propTypes = {
  isLoading: PropTypes.bool,
  paginationModel: PropTypes.object,
  children: PropTypes.any,
  loadData: PropTypes.func,
  containerHeight: PropTypes.string,
};

export default VanityPaginationContainer;