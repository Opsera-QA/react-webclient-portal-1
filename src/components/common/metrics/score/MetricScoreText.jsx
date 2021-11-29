import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function MetricScoreText({score, qualityLevel}) {
  return (
    <MetricTextBase
      formattedText={score}
      qualityLevel={qualityLevel}
      className={"metric-block-content-text"}
    />
  );
}

MetricScoreText.propTypes = {
  score: PropTypes.number,
  qualityLevel: PropTypes.string,
};

export default MetricScoreText;