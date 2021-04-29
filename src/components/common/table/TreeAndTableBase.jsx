import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import PaginationContainer from "components/common/pagination/PaginationContainer";

function TreeAndTableBase({ data, isLoading, noDataMessage, tableComponent, treeComponent, loadData, paginationModel, setPaginationModel }) {
  const getTableBody = () => {
    if (isLoading && (data == null || data.length === 0)) {
      return (
        <div className={"h-100 w-100 table-border"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{ height:"150px", width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Loading Data</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!isLoading && (data == null || data.length === 0)) {
      return (
        <div className={"h-100 w-100 table-border"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{ height:"150px", width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><FontAwesomeIcon icon={faExclamationCircle} className="mr-2 mt-1"/>{noDataMessage}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationModel}
        filterDto={paginationModel}
        isLoading={isLoading}
      >
        <div className={"d-flex w-100"}>
          {treeComponent}
          {tableComponent}
        </div>
      </PaginationContainer>
    );
  };

  return (getTableBody());
}

TreeAndTableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  tableComponent: PropTypes.object,
  treeComponent: PropTypes.object,
  loadData: PropTypes.func,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func
};

export default TreeAndTableBase;