import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function VerticalThreeDataBlockContainer({leftDataBlock, middleDataBlock, rightDataBlock, className}) {
  return (
    <Row className={className}>
      <Col sm={4}>
        {leftDataBlock}
      </Col>
      <Col sm={4}>
        {middleDataBlock}
      </Col>
      <Col sm={4}>
        {rightDataBlock}
      </Col>
    </Row>
  );
}

VerticalThreeDataBlockContainer.propTypes = {
  leftDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  rightDataBlock: PropTypes.any,
  className: PropTypes.string,
};

export default VerticalThreeDataBlockContainer;