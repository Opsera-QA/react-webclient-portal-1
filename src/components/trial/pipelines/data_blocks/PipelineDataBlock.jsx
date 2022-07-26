import React from "react";
import PropTypes from "prop-types";

function PipelineDataBlock(
  {
    metric,
    metricText,
    title,
  }) {
  return (
    <div className={"d-flex h-100"}>
      <div className={"mt-3 mx-4"}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          {title}
        </div>
        <div className={"mt-3"}>
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
    </div>
  );
}

PipelineDataBlock.propTypes = {
  title: PropTypes.string,
  metric: PropTypes.string,
  metricText: PropTypes.string,
};

export default PipelineDataBlock;
