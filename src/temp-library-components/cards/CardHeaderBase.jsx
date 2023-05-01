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
        minHeight: "21px",
        height: "21px",
        maxHeight: "21px",
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