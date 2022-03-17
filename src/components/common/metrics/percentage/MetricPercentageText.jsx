import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";

function MetricPercentageText(
  {
    percentage,
    dataPoint,
    qualityLevel,
    className// TODO: Remove. Left in for legacy code
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

  const getPercentageText = () => {
    if (numberHelpers.hasNumberValue(percentage) === true || !isNaN(percentage)) {
      return `${percentage}%`;
    }

    return percentage;
  };

  return (
    <MetricTextBase
      formattedText={getPercentageText()}
      qualityLevel={getQualityLevel()}
      className={className}
    />
  );
}

MetricPercentageText.propTypes = {
  percentage: PropTypes.any,
  dataPoint: PropTypes.object,
  qualityLevel: PropTypes.string,
  className: PropTypes.string
};

export default MetricPercentageText;