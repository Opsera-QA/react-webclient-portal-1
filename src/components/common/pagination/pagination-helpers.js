import React from "react";
/*import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";*/

export const getResultSummary = (paginationDto, isLoading) => {

  if (isLoading) {
    //return <div><span><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Loading Data</span></div>
    return <div></div>
  }

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