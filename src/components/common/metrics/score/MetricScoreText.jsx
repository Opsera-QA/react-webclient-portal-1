import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";

function MetricScoreText(
  {
    score,
    qualityLevel, // TODO: Remove after strategic criteria is wired up everywhere
    dataPoint,
  }) {
  return (
    <MetricTextBase
      formattedText={score}
      qualityLevel={qualityLevel}
      dataPoint={dataPoint}
      className={"metric-block-content-text"}
    />
  );
}

MetricScoreText.propTypes = {
  score: PropTypes.number,
  qualityLevel: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default MetricScoreText;