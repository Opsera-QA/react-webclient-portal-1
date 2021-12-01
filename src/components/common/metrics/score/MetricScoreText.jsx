import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {strategicCriteriaHelpers} from "components/common/helpers/strategicCriteria.helpers";

// TODO: Rename MetricNumberText
function MetricScoreText(
  {
    score,
    qualityLevel, // TODO: Remove after strategic criteria is wired up everywhere
    dataPoint,
  }) {
  const getQualityLevel = () => {
    let evaluation = qualityLevel;

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint) {
      const evaluatedDataPoint = strategicCriteriaHelpers.evaluateDataPointQualityLevel(dataPoint, score);

      if (typeof evaluatedDataPoint === "string") {
        evaluation = evaluatedDataPoint;
      }
    }

    return evaluation;
  };

  return (
    <MetricTextBase
      formattedText={score}
      qualityLevel={getQualityLevel()}
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