import React from "react";
import PropTypes from "prop-types";

// TODO: Style
function MetricPercentage({ percentage }) {
  return (`${percentage}%`);
}

MetricPercentage.propTypes = {
  percentage: PropTypes.number,
};

export default MetricPercentage;