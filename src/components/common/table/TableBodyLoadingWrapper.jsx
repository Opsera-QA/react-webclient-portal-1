import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Fix so when passing in height the height doesn't change after the table loads
function TableBodyLoadingWrapper({ isLoading, data, tableComponent, noDataMessage, tableHeight }) {
  const getNoDataMessage = () => {
    if (isLoading === true) {
      return ("Loading Data");
    }

    return noDataMessage;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className={"h-100 w-100 table-border"}>
        <div className="w-100 info-text text-center p-3">
          <div className="row" style={{height: tableHeight, width: "100%"}}>
            <div className="col-sm-12 my-auto text-center">
              <span>
                <IconBase icon={faExclamationCircle} isLoading={isLoading} className="mr-2 mt-1"/>
                {getNoDataMessage()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tableComponent == null) {
    return null;
  }

  return (tableComponent);
}

TableBodyLoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  tableComponent: PropTypes.object,
  noDataMessage: PropTypes.string,
  tableHeight: PropTypes.string
};

TableBodyLoadingWrapper.defaultProps = {
  tableHeight: "500px",
  noDataMessage: "No data is currently available"
};

export default TableBodyLoadingWrapper;