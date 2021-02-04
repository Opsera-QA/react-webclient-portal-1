import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function CardView({ cards, isLoading, paginationDto, setPaginationDto, loadData, title }) {
  // TODO: its own component
  const getLoadingIcon = () => {
    if (isLoading && cards != null) {
      return (<FontAwesomeIcon icon={faSpinner} spin className="ml-2 my-auto"/>);
    }
  };

  const getTitle = () => {
    if (title) {
      return (<span className="h6">{title}{getLoadingIcon()}</span>);
    }
  };

  if (!isLoading && cards == null) {
    return <div className="info-text text-center p-5">No data is currently available</div>
  }

  return (
    <div className="p-2 px-3">
      <div>{getTitle()}</div>
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationDto}
        filterDto={paginationDto}
        isLoading={isLoading}
      >
        <div>
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