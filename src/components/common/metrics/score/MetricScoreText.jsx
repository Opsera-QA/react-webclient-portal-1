import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function MetricScoreText({score, qualityLevel}) {
  if (score == null) {
    return null;
  }

  return (
    <MetricTextBase
      formattedText={score}
      qualityLevel={qualityLevel}
    />
  );
}

MetricScoreText.propTypes = {
  score: PropTypes.number,
  qualityLevel: PropTypes.string,
};

export default MetricScoreText;