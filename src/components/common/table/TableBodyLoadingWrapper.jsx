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
        <span className={"error-text-alt"}>
          <IconBase
            icon={faExclamationCircle}
            isLoading={isLoading}
            className={"mr-2 mt-1"}
            iconSize={"xl"}
          />
          {errorHelpers.parseApiErrorForInfoText(undefined, error)}
        </span>
      </CenteredContentWrapper>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CenteredContentWrapper minHeight={tableHeight}>
        <span className={"info-text-alt"}>
          <IconBase
            iconSize={"xl"}
            icon={faTriangleExclamation}
            isLoading={isLoading}
            className={"mr-2 mt-1"}
          />
          {getNoDataMessage()}
        </span>
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