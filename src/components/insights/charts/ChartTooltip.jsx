import React from "react";
import PropTypes from "prop-types";

function ChartTooltip({titles, values, color, style=true}) {
  return (
    <div
      style={{
        background: "white",
        padding: style && "9px 12px",
        border: style && "1px solid #ccc"
      }}
    >
      {titles.map((title, i) => (
        <div key={`title-${i}`}>
          {i !== 0 && <br></br>}
          <strong style={{ color }}> {title}: </strong> {values[i]}
        </div>
      ))}
    </div>
  );
}

ChartTooltip.propTypes = {
  titles: PropTypes.array,
  values: PropTypes.array,
  color: PropTypes.string,
  style: PropTypes.bool,
};

export default ChartTooltip;