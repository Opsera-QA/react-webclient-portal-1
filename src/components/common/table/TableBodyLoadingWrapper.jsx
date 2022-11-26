import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle, faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {errorHelpers} from "components/common/helpers/error-helpers";

// TODO: Fix so when passing in height the height doesn't change after the table loads
function TableBodyLoadingWrapper(
  {
    isLoading,
    data,
    tableComponent,
    noDataMessage,
    tableHeight,
    error,
  }) {
  const getNoDataMessage = () => {
    if (isLoading === true) {
      return ("Loading Data");
    }

    return noDataMessage;
  };

  if (error) {
    return (
      <CenteredContentWrapper minHeight={tableHeight}>
        <div className={"error-text-alt mx-3"}>
          <IconBase
            icon={faExclamationCircle}
            isLoading={isLoading}
            iconSize={"xl"}
            className={"mr-2"}
          />
          {errorHelpers.parseApiErrorForInfoText(undefined, error)}
        </div>
      </CenteredContentWrapper>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CenteredContentWrapper minHeight={tableHeight}>
        <div className={"info-text-alt mx-3"}>
          <IconBase
            iconSize={"xl"}
            icon={faTriangleExclamation}
            isLoading={isLoading}
            className={"mr-2"}
          />
          {getNoDataMessage()}
        </div>
      </CenteredContentWrapper>
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
  tableHeight: PropTypes.string,
  error: PropTypes.any,
};

TableBodyLoadingWrapper.defaultProps = {
  tableHeight: "500px",
  noDataMessage: "No data is currently available"
};

export default TableBodyLoadingWrapper;