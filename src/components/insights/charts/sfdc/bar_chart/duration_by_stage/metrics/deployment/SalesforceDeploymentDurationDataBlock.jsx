import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  SALESFORCE_DURATION_BY_STAGE_METRICS_CONSTANTS as constants
} from "../../SalesforceDurationByStageMetrics_kpi_datapoint_identifiers";

function SalesforceDeploymentDurationDataBlock({
  deploymentDurationMeanInMinutes,
  deploymentTotalRunCount,
  goalsData,
  kpiConfiguration
}) {
  const hasPositiveNumberValue = (potentialNumber) => {
    return potentialNumber == undefined ||
      potentialNumber == null ||
      typeof potentialNumber !== "number" ||
      potentialNumber === 0
      ? false
      : true;
  };
  const durationDeploymentDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_DATA_POINT);

  const getMetricQualityLevel = () => {
    if (!hasPositiveNumberValue(deploymentDurationMeanInMinutes) || !hasPositiveNumberValue(goalsData)) {
      return;
    }

    if (durationDeploymentDataPoint) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(durationDeploymentDataPoint, deploymentDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
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
      dataPoint={durationDeploymentDataPoint}
    />
  );
}

SalesforceDeploymentDurationDataBlock.propTypes = {
  deploymentDurationMeanInMinutes: PropTypes.number,
  deploymentTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
};

export default SalesforceDeploymentDurationDataBlock;
