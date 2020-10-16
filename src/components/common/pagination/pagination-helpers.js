import React from "react";

export const getResultSummary = (paginationDto) => {

  if (paginationDto.getData("totalCount") === 0) {
    return (
      <div><span>No Results Found</span></div>
    );
  }

  const lowerResultsViewLimit = ((paginationDto.getData("currentPage") - 1) * paginationDto.getData("pageSize")) + 1;
  const upperResultsViewLimit = (lowerResultsViewLimit + paginationDto.getData("pageSize")) - 1;
  let countOffsetUpper = (upperResultsViewLimit < paginationDto.getData("totalCount")) ? upperResultsViewLimit : paginationDto.getData("totalCount");
  return (<div><span>Results {lowerResultsViewLimit} - {countOffsetUpper} of {paginationDto.getData("totalCount")}</span></div>);
};