import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";

function VerticalCardViewBase({ data, getCardFunction, noDataMessage }) {
  if (!Array.isArray(data) || data.length === 0) {
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
        <Col
          key={index}
          xl={3}
          lg={4}
          md={6}
          sm={12}
          className={"p-2"}
        >
          {getCardFunction(toolData)}
        </Col>
      ))}
    </Row>
  );
}

VerticalCardViewBase.propTypes = {
  data: PropTypes.array,
  getCardFunction: PropTypes.func,
  noDataMessage: PropTypes.string,
};

VerticalCardViewBase.defaultProps = {
  noDataMessage: "No data is currently available",
};

export default VerticalCardViewBase;
