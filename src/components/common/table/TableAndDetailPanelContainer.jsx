import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

// TODO: Style
function TableAndDetailPanelContainer({ table, detailPanel, className }) {

  return (
    <div className={className}>
      <div className={"pb-2"}>{table}</div>
      <div>{detailPanel}</div>
    </div>
  );
}

TableAndDetailPanelContainer.propTypes = {
  table: PropTypes.object,
  detailPanel: PropTypes.object,
  className: PropTypes.string
};

export default TableAndDetailPanelContainer;