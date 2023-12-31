import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

export default function SelectionCardColumn(
  {
    children,
  }) {
  return (
    <Col
      xl={3}
      lg={4}
      md={6}
      sm={12}
      className={"p-2"}
    >
      {children}
    </Col>
  );
}

SelectionCardColumn.propTypes = {
  children: PropTypes.any,
};