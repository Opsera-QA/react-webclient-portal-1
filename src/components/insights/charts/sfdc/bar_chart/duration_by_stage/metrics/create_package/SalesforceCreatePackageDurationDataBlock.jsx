import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import "../../salesforce-duration-by-stage-kpi.css";
function SalesforceCreatePackageDurationDataBlock({
  createPackageDurationMeanInMinutes,
  createPackageTotalRunCount,
  goalsData,
}) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getMetricQualityLevel = () => {
    if (!hasNumberValue(createPackageDurationMeanInMinutes) || !hasNumberValue(goalsData)) {
      return;
    }
    if (goalsData > createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.GREEN;
    } else if (goalsData < createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.DANGER;
    } else if (goalsData == createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.WARNING;
    }
  };

  const getCreatePackageMeanData = () => {
    if (hasNumberValue(createPackageDurationMeanInMinutes) && hasNumberValue(createPackageTotalRunCount)) {
      const qualityLevel = getMetricQualityLevel();
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${createPackageDurationMeanInMinutes} min`} qualityLevel={qualityLevel} />
          </div>
          <div>
            <MetricTextBase formattedText={`${createPackageTotalRunCount} runs`} qualityLevel={qualityLevel} />
          </div>
        </>
      );
    }
    if (hasNumberValue(createPackageDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${createPackageDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Creation"}
      middleText={getCreatePackageMeanData()}
      bottomText={hasNumberValue(goalsData) ? `Goal: ${goalsData} min` : "No Goal"}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  createPackageDurationMeanInMinutes: PropTypes.number,
  createPackageTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceCreatePackageDurationDataBlock;
