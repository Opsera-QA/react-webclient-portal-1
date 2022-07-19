import React from "react";
import PropTypes from "prop-types";

function PipelineDataBlock(
  {
    metric,
    metricText,
    title,
  }) {
  return (
    <div className={"pt-3 pb-1 px-4 h-100"}>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "15px",
        }}
      >
        {title}
      </div>
      <div className={"mt-auto"}>
        <span
          className={"mt-auto"}
          style={{
            fontSize: "29px",
            fontWeight: 700,
          }}
        >
          {metric}
        </span>
        <span
          className={"mt-auto ml-2"}
          style={{
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          {metricText}
        </span>
      </div>
    </div>
  );
}

PipelineDataBlock.propTypes = {
  title: PropTypes.string,
  metric: PropTypes.string,
  metricText: PropTypes.string,
};

export default PipelineDataBlock;
