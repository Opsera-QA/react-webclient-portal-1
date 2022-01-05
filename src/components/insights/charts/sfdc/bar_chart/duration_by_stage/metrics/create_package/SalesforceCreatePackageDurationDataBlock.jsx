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
  const hasPositiveNumberValue = (potentialNumber) => {
    return potentialNumber == undefined ||
      potentialNumber == null ||
      typeof potentialNumber !== "number" ||
      potentialNumber === 0
      ? false
      : true;
  };

  const getMetricQualityLevel = () => {
    if (!hasPositiveNumberValue(createPackageDurationMeanInMinutes) || !hasPositiveNumberValue(goalsData)) {
      return;
    }
    if (goalsData > createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.SUCCESS;
    } else if (goalsData < createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.DANGER;
    } else if (goalsData == createPackageDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.WARNING;
    }
  };

  const getCreatePackageMeanData = () => {
    if (
      hasPositiveNumberValue(createPackageDurationMeanInMinutes) &&
      hasPositiveNumberValue(createPackageTotalRunCount)
    ) {
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
    if (hasPositiveNumberValue(createPackageDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${createPackageDurationMeanInMinutes} min`} />;
    }
    return "No runs";
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Creation"}
      middleText={getCreatePackageMeanData()}
      bottomText={hasPositiveNumberValue(goalsData) ? `Goal: < ${goalsData} min` : "No Goal"}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  createPackageDurationMeanInMinutes: PropTypes.number,
  createPackageTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceCreatePackageDurationDataBlock;
