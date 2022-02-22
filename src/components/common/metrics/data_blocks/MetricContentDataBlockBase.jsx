import React from "react";
import PropTypes from "prop-types";

function MetricContentDataBlockBase({ title, content, className }) {
  if (title == null) {
    return null;
  }
  return (
    <div className={className}>
      <div className={"p-3 medium-data-block-height"}>
        <div className={"font-inter-light-400 metric-block-content-text-md dark-gray-text-primary"}>{title} </div>
        <div className={"p-1 light-gray-text-secondary font-inter-light-400"}>{content}</div>
      </div>
    </div>
  );
}

MetricContentDataBlockBase.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.node,
};

export default MetricContentDataBlockBase;