import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function TableCardView(
  {
    filterModel,
    tableView,
    cardView,
    data,
    isLoading,
  }) {
  const getView = () => {
    if (!Array.isArray(data) || data.length === 0) {
      if (isLoading) {
        // TODO: Make good looking loading display
        return (<div className="info-text text-center p-5"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</div>);
      }
    }

    if (filterModel?.getData("viewType") === "card") {
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
  filterModel: PropTypes.object,
  tableView: PropTypes.object,
  cardView: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default TableCardView;