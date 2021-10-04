import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";

function VerticalCardViewBase({ data, getCardFunction }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <Row className={"mx-0"}>
      {data.map((toolData, index) => (
        <Col key={index} className={"m-2 px-0"}>
          {getCardFunction(toolData)}
        </Col>
      ))}
    </Row>
  );
}

VerticalCardViewBase.propTypes = {
  data: PropTypes.array,
  getCardFunction: PropTypes.func,
};

export default VerticalCardViewBase;
