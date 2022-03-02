import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";

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
        return (<div className="info-text text-center p-5"><LoadingIcon className={"mr-1"}/>Loading Data</div>);
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