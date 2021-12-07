import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function MetricPercentageText(
  {
    percentage,
    dataPoint,
    qualityLevel, // TODO: Remove. Left in for legacy code
  }) {
  const getQualityLevel = () => {
    let evaluation = qualityLevel;

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, percentage);

      if (typeof evaluatedDataPoint === "string") {
        evaluation = evaluatedDataPoint;
      }
    }

    return evaluation;
  };

  return (
    <MetricTextBase
      formattedText={`${percentage}%`}
      qualityLevel={getQualityLevel()}
    />
  );
}

MetricPercentageText.propTypes = {
  percentage: PropTypes.number,
  dataPoint: PropTypes.object,
  qualityLevel: PropTypes.string,
};

export default MetricPercentageText;