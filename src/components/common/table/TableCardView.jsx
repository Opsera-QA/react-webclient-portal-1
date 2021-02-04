import React from "react";
import PropTypes from "prop-types";

function TableCardView({ filterDto, tableView, cardView, data, isLoading }) {
  const getView = () => {
    // if (isLoading && !Array.isArray(data) || data.length === 0) {
    //   // TODO: Make good looking loading display
    // }

    if (filterDto?.getData("viewType") === "card") {
      return (cardView);
    }

    return (tableView);
  };

  return (
    <div>
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