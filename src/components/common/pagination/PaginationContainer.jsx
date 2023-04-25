import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import LoadingDialog from "components/common/status_notifications/loading";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

function PaginationContainer(
  {
    isLoading,
    filterDto,
    setFilterDto,
    loadData,
    children,
    scrollOnLoad,
    nextGeneration,
    data,
    loadingMessage,
    paginationStyle,
    topPaginationStyle,
    bodyClassName,
    containerHeight,
  }) {
  const getTopPaginator = () => {
    return (
      <DtoTopPagination
        paginationDto={filterDto}
        setPaginationDto={setFilterDto}
        isLoading={isLoading}
        loadData={loadData}
        topPaginationStyle={topPaginationStyle}
      />
    );
  };

  const getBottomPaginator = () => {
    return (
      <DtoBottomPagination
        scrollOnLoad={scrollOnLoad}
        paginationDto={filterDto}
        setPaginationDto={setFilterDto}
        isLoading={isLoading}
        loadData={loadData}
        paginationStyle={paginationStyle}
      />
    );
  };

  const getBody = () => {
    if (isLoading && (!Array.isArray(data) || data.length === 0)) {
      return (
        <CenterLoadingIndicator
          message={loadingMessage}
        />
      );
    }

    return (<div className={`h-100 ${bodyClassName}`}>{children}</div>);
  };

  if (filterDto == null) {
    return children;
  }

  //TODO: This is a workaround until everything is updated to new standards
  if (nextGeneration === true) {
    return (
      <VanityPaginationContainer
        paginationModel={filterDto}
        isLoading={isLoading}
        loadData={loadData}
        containerHeight={containerHeight}
      >
        {children}
      </VanityPaginationContainer>
    );
  }

  return (
    <div className="pagination-container h-100" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      {getTopPaginator()}
      {getBody()}
      {getBottomPaginator()}
    </div>
  );
}

PaginationContainer.propTypes = {
  isLoading: PropTypes.bool,
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  children: PropTypes.any,
  loadData: PropTypes.func,
  scrollOnLoad: PropTypes.bool,
  nextGeneration: PropTypes.bool,
  data: PropTypes.array,
  loadingMessage: PropTypes.string,
  paginationStyle: PropTypes.string,
  topPaginationStyle: PropTypes.string,
  bodyClassName: PropTypes.string,
  containerHeight: PropTypes.string,
};

PaginationContainer.defaultProps = {
  loadingMessage: "Loading Data",
  bodyClassName: ""
};

export default PaginationContainer;