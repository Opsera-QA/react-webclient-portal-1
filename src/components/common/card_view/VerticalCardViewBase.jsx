import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import Col from "react-bootstrap/Col";
import LoadMoreItemsButton from "temp-library-components/button/load/LoadMoreItemsButton";

export default function VerticalCardViewBase(
  {
    data,
    getCardFunction,
    noDataMessage,
    isLoading,
    minHeight,
    hasMoreItems,
    loadMoreItems,
  }) {
  if (!Array.isArray(data) || data.length === 0) {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator minHeight={minHeight} />
      );
    }

    return (
      <CenteredContentWrapper minHeight={minHeight}>
        {noDataMessage}
      </CenteredContentWrapper>
    );
  }

  const getLoadMoreItemsLink = () => {
    if (hasMoreItems === true && loadMoreItems) {
      return (
        <Col xs={12}>
          <div className={"d-flex w-100"}>
            <LoadMoreItemsButton
              hasMoreItems={hasMoreItems}
              loadMoreItems={loadMoreItems}
            />
          </div>
        </Col>
      );
    }
  };

  return (
    <Row className={"mx-0 p-2"}>
      {data.map((toolData, index) => (
        <SelectionCardColumn
          key={index}
        >
          {getCardFunction(toolData)}
        </SelectionCardColumn>
      ))}
      {getLoadMoreItemsLink()}
    </Row>
  );
}

VerticalCardViewBase.propTypes = {
  data: PropTypes.array,
  getCardFunction: PropTypes.func,
  noDataMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  minHeight: PropTypes.string,
  hasMoreItems: PropTypes.bool,
  loadMoreItems: PropTypes.func,
};

VerticalCardViewBase.defaultProps = {
  noDataMessage: "No data is currently available",
};