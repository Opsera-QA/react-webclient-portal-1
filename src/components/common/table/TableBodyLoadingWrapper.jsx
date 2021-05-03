import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function TableBodyLoadingWrapper({ isLoading, data, tableComponent, noDataMessage }) {
  if (data == null || data.length === 0) {
    return (
      <div className={"h-100 w-100 table-border"}>
        <div className="w-100 info-text text-center p-3">
          <div className="row" style={{height: "150px", width: "100%"}}>
            <div className="col-sm-12 my-auto text-center">
              <span>
                <IconBase icon={faExclamationCircle} isLoading={isLoading} className="mr-2 mt-1"/>
                {isLoading ? "Loading Data" : noDataMessage}
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
  noDataMessage: PropTypes.string
};


export default TableBodyLoadingWrapper;