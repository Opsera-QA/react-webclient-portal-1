import React from "react";
import PropTypes from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import InfoMessageFieldBase from "../fields/text/message/InfoMessageFieldBase";
import ErrorMessageFieldBase from "../fields/text/message/ErrorMessageFieldBase";

// TODO: Fix so when passing in height the height doesn't change after the table loads
function TableBodyLoadingWrapper(
  {
    isLoading,
    data,
    tableComponent,
    noDataMessage,
    minHeight,
    error,
  }) {
  if (error) {
    return (
      <CenteredContentWrapper
        minHeight={minHeight}
      >
        <ErrorMessageFieldBase
          message={error}
          />
      </CenteredContentWrapper>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          minHeight={minHeight}
        />
      );
    }

    return (
      <CenteredContentWrapper minHeight={minHeight}>
        <InfoMessageFieldBase
          message={noDataMessage}
          showInformationLabel={false}
          />
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
  minHeight: PropTypes.string,
  error: PropTypes.any,
};

TableBodyLoadingWrapper.defaultProps = {
  noDataMessage: "No data is currently available"
};

export default TableBodyLoadingWrapper;