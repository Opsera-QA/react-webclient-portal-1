import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function VerticalCardViewBase(
  {
    data,
    getCardFunction,
    noDataMessage,
    isLoading,
  }) {
  if (!Array.isArray(data) || data.length === 0) {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator  />
      );
    }

    return (
      <CenteredContentWrapper>
        {noDataMessage}
      </CenteredContentWrapper>
    );
  }

  return (
    <Row className={"mx-0 p-2"}>
      {data.map((toolData, index) => (
        <SelectionCardColumn
          key={index}
        >
          {getCardFunction(toolData)}
        </SelectionCardColumn>
      ))}
    </Row>
  );
}

VerticalCardViewBase.propTypes = {
  data: PropTypes.array,
  getCardFunction: PropTypes.func,
  noDataMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

VerticalCardViewBase.defaultProps = {
  noDataMessage: "No data is currently available",
};