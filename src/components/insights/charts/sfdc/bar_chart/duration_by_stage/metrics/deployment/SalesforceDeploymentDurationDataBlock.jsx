import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";

function SalesforceDeploymentDurationDataBlock({
  deploymentDurationMeanInMinutes,
  deploymentTotalRunCount,
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
    if (!hasPositiveNumberValue(deploymentDurationMeanInMinutes) || !hasPositiveNumberValue(goalsData)) {
      return;
    }
    if (goalsData > deploymentDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.SUCCESS;
    } else if (goalsData < deploymentDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.DANGER;
    } else if (goalsData == deploymentDurationMeanInMinutes) {
      return METRIC_QUALITY_LEVELS.WARNING;
    }
  };

  const getDeploymentMeanBlock = () => {
    if (hasPositiveNumberValue(deploymentDurationMeanInMinutes) && hasPositiveNumberValue(deploymentTotalRunCount)) {
      const qualityLevel = getMetricQualityLevel();
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${deploymentDurationMeanInMinutes} min`} qualityLevel={qualityLevel} />
          </div>
          <div>
            <MetricTextBase formattedText={`${deploymentTotalRunCount} runs`} qualityLevel={qualityLevel} />
          </div>
        </>
      );
    }
    return "Error!";
  };
  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Deployment"}
      middleText={getDeploymentMeanBlock()}
      bottomText={hasPositiveNumberValue(goalsData) ? `Goal: < ${goalsData}  min` : "No Goal"}
    />
  );
}

SalesforceDeploymentDurationDataBlock.propTypes = {
  deploymentDurationMeanInMinutes: PropTypes.number,
  deploymentTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceDeploymentDurationDataBlock;
