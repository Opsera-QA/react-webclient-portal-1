import React from "react";
import PropTypes from "prop-types";

// TODO: Style
function MetricScore({ score }) {
  if (score == null) {
    return null;
  }

  return (score);
}

MetricScore.propTypes = {
  score: PropTypes.number,
};

export default MetricScore;