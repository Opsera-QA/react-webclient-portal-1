import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

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
      <Row>
        <Col xs={12} className={"info-text text-center p-5"}>
          {noDataMessage}
        </Col>
      </Row>
    );
  }

  return (
    <Row className={"mx-0"}>
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