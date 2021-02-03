import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData }) {
  // TODO: add styling
  // TODO: do we really want to wrap pagination always?
  return (
    <PaginationContainer
      loadData={loadData}
      setFilterDto={setPaginationDto}
      filterDto={paginationDto}
      isLoading={isLoading}
    >
      {cards}
    </PaginationContainer>
  );
}

CardView.propTypes = {
  cards: PropTypes.array,
  isLoading: PropTypes.bool,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func
};

CardView.defaultProps = {
  cards: [],
};

export default CardView;