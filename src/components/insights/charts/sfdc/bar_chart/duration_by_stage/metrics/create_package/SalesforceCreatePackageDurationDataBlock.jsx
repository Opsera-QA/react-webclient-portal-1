import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import "../../salesforce-duration-by-stage-kpi.css";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  SALESFORCE_DURATION_BY_STAGE_METRICS_CONSTANTS as constants
} from "../../SalesforceDurationByStageMetrics_kpi_datapoint_identifiers";
function SalesforceCreatePackageDurationDataBlock({
  createPackageDurationMeanInMinutes,
  createPackageTotalRunCount,
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

  const packageCreationDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.CREATE_PACKAGE_DATA_POINT);

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (packageCreationDataPoint) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(packageCreationDataPoint, createPackageDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
    }

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
      dataPoint={packageCreationDataPoint}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  createPackageDurationMeanInMinutes: PropTypes.number,
  createPackageTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
};

export default SalesforceCreatePackageDurationDataBlock;
