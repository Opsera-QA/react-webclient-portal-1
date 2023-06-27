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
    tableHeight,
    error,
  }) {
  if (error) {
    return (
      <CenteredContentWrapper>
        <ErrorMessageFieldBase
          tableHeight={tableHeight}
          message={error}
        />
      </CenteredContentWrapper>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          tableHeight={tableHeight}
        />
      );
    }

    return (
      <CenteredContentWrapper>
        <InfoMessageFieldBase
          message={noDataMessage}
          tableHeight={tableHeight}
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
  tableHeight: PropTypes.string,
  error: PropTypes.any,
};

TableBodyLoadingWrapper.defaultProps = {
  tableHeight: "500px",
  noDataMessage: "No data is currently available"
};

export default TableBodyLoadingWrapper;