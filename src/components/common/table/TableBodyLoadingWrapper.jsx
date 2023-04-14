import React from "react";
import PropTypes from "prop-types";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import ErrorLoadingDataField from "components/common/fields/text/message/ErrorLoadingDataField";

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
  if (error) {
    return (
      <CenteredContentWrapper
        minHeight={tableHeight}
      >
        <ErrorLoadingDataField
          error={error}
        />
      </CenteredContentWrapper>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          minHeight={tableHeight}
        />
      );
    }

    return (
      <CenteredContentWrapper minHeight={tableHeight}>
        <div className={"info-text-alt mx-3"}>
          <IconBase
            iconSize={"xl"}
            icon={faTriangleExclamation}
            isLoading={isLoading}
            className={"mr-2"}
          />
          {noDataMessage}
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