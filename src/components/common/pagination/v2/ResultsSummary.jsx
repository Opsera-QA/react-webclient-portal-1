import React from "react";
import PropTypes from "prop-types";

function ResultsSummary({paginationModel, isLoading}) {
  const getResultsText = () => {
    const currentPage = paginationModel.getData("currentPage");
    const pageSize = paginationModel?.getFilterValue("pageSize");
    const totalCount = paginationModel?.getData("totalCount");
    const lowerResultsViewLimit = ((currentPage - 1) * pageSize) + 1;
    const upperResultsViewLimit = (lowerResultsViewLimit + pageSize) - 1;
    const countOffsetUpper = (upperResultsViewLimit < totalCount) ? upperResultsViewLimit : totalCount;

    return (`Results ${lowerResultsViewLimit} - ${countOffsetUpper} of ${totalCount}`);
  };

  if (isLoading || paginationModel?.getData("totalCount") == null || paginationModel?.getData("totalCount") === 0) {
    return null;
  }

  return (<span>{getResultsText()}</span>);
}

ResultsSummary.propTypes = {
  paginationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ResultsSummary;