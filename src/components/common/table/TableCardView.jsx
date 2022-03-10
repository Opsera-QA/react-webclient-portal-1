import React from "react";
import PropTypes from "prop-types";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

function TableCardView(
  {
    filterModel,
    tableView,
    cardView,
    data,
    isLoading,
    tableHeight,
  }) {
  const getView = () => {
    if (isLoading === true && !Array.isArray(data) || data.length === 0) {
      return (
        <div style={{height: tableHeight}}>
          <CenterLoadingIndicator/>
        </div>
      );
    }

    if (filterModel?.getData("viewType") === "card") {
      return (cardView);
    }

    return (tableView);
  };

  return (
    <div className={"table-card-panel h-100"}>
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
  tableHeight: PropTypes.string,
};

TableCardView.defaultProps = {
  tableHeight: "500px",
};

export default TableCardView;