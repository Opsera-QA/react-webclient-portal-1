import React from "react";
import PropTypes from "prop-types";

export default function CardHeaderBase(
  {
    backgroundColor,
    color,
    children,
  }) {
  if (children == null) {
    return undefined;
  }

  return (
    <div
      className={"d-flex w-100 py-1"}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        fontSize: "13px",
        letterSpacing: "0.6px",
        minHeight: "25px",
        height: "25px",
        maxHeight: "25px",
      }}
    >
      {children}
    </div>
  );
}

CardHeaderBase.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
};