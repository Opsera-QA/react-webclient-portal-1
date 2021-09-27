import React from "react";

export const getResultSummary = (paginationDto, isLoading) => {

  if (isLoading || paginationDto?.getData("totalCount") == null || paginationDto?.getData("totalCount") === 0) {
    return null;
  }

  const lowerResultsViewLimit = ((paginationDto.getData("currentPage") - 1) * paginationDto.getFilterValue("pageSize")) + 1;
  const upperResultsViewLimit = (lowerResultsViewLimit + paginationDto.getData("pageSize")) - 1;
  let countOffsetUpper = (upperResultsViewLimit < paginationDto.getData("totalCount")) ? upperResultsViewLimit : paginationDto.getData("totalCount");
  return (<div className="text-nowrap"><span>{`Results ${lowerResultsViewLimit} - ${countOffsetUpper} of ${paginationDto?.getData("totalCount")}`}</span></div>);
};