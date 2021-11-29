import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function MetricPercentageText({ percentage, qualityLevel }) {
  return (
    <MetricTextBase
      formattedText={`${percentage}%`}
      qualityLevel={qualityLevel}
      className="metric-block-content-text"
    />
  );
}

MetricPercentageText.propTypes = {
  percentage: PropTypes.number,
  qualityLevel: PropTypes.string,
};

export default MetricPercentageText;