import React from "react";
import PropTypes from "prop-types";

function ChartTooltip({title1, title2, value1, value2, color, style=true}) {
  return (
    <div
      style={{
        background: "white",
        padding: style && "9px 12px",
        border: style && "1px solid #ccc"
      }}
    >
      <strong style={{ color }}> {title1}: </strong> {value1}
      {title2 && (
        <>
          <br></br>
          <strong style={{ color }}> {title2}: </strong> {value2}
        </>
      )}
    </div>
  );
}

ChartTooltip.propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.bool,
};

export default ChartTooltip;