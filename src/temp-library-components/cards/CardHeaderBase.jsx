import React from "react";
import PropTypes from "prop-types";

export default function CardHeaderBase(
  {
    backgroundColor,
    color,
    header,
  }) {
  if (header == null) {
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
      }}
    >
      {header}
    </div>
  );
}

CardHeaderBase.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  header: PropTypes.any,
};