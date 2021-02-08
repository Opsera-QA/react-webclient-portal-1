import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData }) {
  if (!isLoading && cards == null) {
    return <div className="info-text text-center p-5">No data is currently available</div>
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
  loadData: PropTypes.func
};

export default CardView;