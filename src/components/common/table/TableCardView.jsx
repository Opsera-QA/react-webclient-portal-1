import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function TableCardView({ filterDto, tableView, cardView, data, isLoading }) {
  const getView = () => {
    if (isLoading && (!Array.isArray(data) || data.length === 0)) {
      // TODO: Make good looking loading display
      return (<div className="info-text text-center p-5"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</div>);
    }

    if (filterDto?.getData("viewType") === "card") {
      return (cardView);
    }

    return (tableView);
  };

  return (
    <div className="table-card-panel">
      {getView()}
    </div>
  );
}

TableCardView.propTypes = {
  filterDto: PropTypes.object,
  tableView: PropTypes.object,
  cardView: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default TableCardView;