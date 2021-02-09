import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData, noDataMessage }) {
  if (!isLoading && cards == null) {
    return <div className="info-text text-center p-5">{noDataMessage}</div>
  }

  return (
    <div className="card-container">
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationDto}
        filterDto={paginationDto}
        isLoading={isLoading}
      >
        <div className="px-3">
          {cards}
        </div>
      </PaginationContainer>
    </div>
  );
}

CardView.propTypes = {
  cards: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  noDataMessage: PropTypes.string
};

CardView.defaultProps = {
  noDataMessage: "No data is currently available"
};

export default CardView;