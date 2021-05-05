import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Combine with TableBodyLoadingWrapper
function ComponentLoadingWrapper({ isLoading, data, component, noDataMessage }) {
  if (data == null || data.length === 0) {
    return (
      <div className={"h-100 w-100"}>
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

  if (component == null) {
    return null;
  }

  return (component);
}

ComponentLoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  component: PropTypes.object,
  noDataMessage: PropTypes.string
};


export default ComponentLoadingWrapper;