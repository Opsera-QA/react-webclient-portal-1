import React from "react";
import PropTypes from "prop-types";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import "../../salesforce-duration-by-stage-kpi.css";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
function SalesforceCreatePackageDurationDataBlock({
  createPackageDurationMeanInMinutes,
  createPackageTotalRunCount,
  goalsData,
  kpiConfiguration,
  dataPoint
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

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint && hasPositiveNumberValue(createPackageDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, createPackageDurationMeanInMinutes);

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
    const qualityLevel = getMetricQualityLevel();
    if (
      hasPositiveNumberValue(createPackageDurationMeanInMinutes) &&
      hasPositiveNumberValue(createPackageTotalRunCount)
    ) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${createPackageDurationMeanInMinutes} min`} qualityLevel={qualityLevel} className={"metric-block-content-text"}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${createPackageTotalRunCount} runs`} qualityLevel={qualityLevel} className={"metric-block-content-text"}/>
          </div>
        </>
      );
    }
    if (hasPositiveNumberValue(createPackageDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${createPackageDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Creation"}
      middleText={getCreatePackageMeanData()}
      dataPoint={dataPoint}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  createPackageDurationMeanInMinutes: PropTypes.number,
  createPackageTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dataPoint: PropTypes.object
};

export default SalesforceCreatePackageDurationDataBlock;
