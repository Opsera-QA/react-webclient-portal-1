import React from "react";
import PropTypes from "prop-types";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData }) {
  const getTopPaginator = () => {
    return (
      <DtoTopPagination
        paginationDto={paginationDto}
        setPaginationDto={setPaginationDto}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  const getBottomPaginator = () => {
    if (paginationDto && paginationDto.getData("totalCount") != null) {
      return (
        <DtoBottomPagination
          paginationDto={paginationDto}
          setPaginationDto={setPaginationDto}
          isLoading={isLoading}
          loadData={loadData}
        />
      );
    }
  };

  // TODO: add styling 
  return (
    <div>
      {getTopPaginator}
      {cards}
      {getBottomPaginator()}
    </div>
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