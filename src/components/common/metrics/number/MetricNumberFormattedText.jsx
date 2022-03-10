import React from "react";
import PropTypes from "prop-types";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";

function MetricNumberFormattedText(
  {
    numberData,
    supportingText,
    dataPoint,
    qualityLevel, // TODO: Remove. Left in for legacy code
  }) {
  const getQualityLevel = () => {
    let evaluation = qualityLevel;

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, numberData);

      if (typeof evaluatedDataPoint === "string") {
        evaluation = evaluatedDataPoint;
      }
    }

    return evaluation;
  };

  const getNumberFormattedText = () => {
    if (numberHelpers.hasNumberValue(numberData) === true || !isNaN(numberData)) {
      return `${numberData} ${supportingText}`;
    }

    return numberData;
  };

  return (
    <MetricTextBase
      formattedText={getNumberFormattedText()}
      qualityLevel={getQualityLevel()}
    />
  );
}

MetricNumberFormattedText.propTypes = {
  numberData: PropTypes.any,
  supportingText: PropTypes.any,
  dataPoint: PropTypes.object,
  qualityLevel: PropTypes.string,
};

export default MetricNumberFormattedText;