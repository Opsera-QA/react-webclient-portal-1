import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData, title }) {
  // TODO: its own component
  const getLoadingIcon = () => {
    if (isLoading && title && cards != null) {
      return (<FontAwesomeIcon icon={faSpinner} spin className="ml-2 my-auto"/>);
    }
  };

  const getTitle = () => {
    if (title) {
      return (<span className="h6">{title}{getLoadingIcon()}</span>);
    }
  };

  return (
    <PaginationContainer
      loadData={loadData}
      setFilterDto={setPaginationDto}
      filterDto={paginationDto}
      isLoading={isLoading}
    >
      <div className="px-2">
        <div>{getTitle()}</div>
        {cards}
      </div>
    </PaginationContainer>
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