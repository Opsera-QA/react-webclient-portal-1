import React from "react";
import PropTypes from "prop-types";

function TableCardView({ filterDto, tableView, cardView }) {
  const getView = () => {
    if (filterDto.getData("viewType") === "list") {
      return (tableView);
    }

    return (cardView);
  };

  // TODO: add styling
  return (
    <>
      {getView()}
    </>
  );
}

TableCardView.propTypes = {
  filterDto: PropTypes.object,
  tableView: PropTypes.object,
  cardView: PropTypes.object,
};

export default TableCardView;