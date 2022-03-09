import React from "react";
import PropTypes from "prop-types";
import MetricTextBase, {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforcePackageValidationDurationDataBlock({
  packageValidationDurationMeanInMinutes,
  packageValidationTotalRunCount,
  kpiConfiguration,
  dataPoint
}) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint && hasNumberValue(packageValidationDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, packageValidationDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
    }
  };

  const getPackageValidationMeanData = () => {
    const qualityLevel = getMetricQualityLevel();
    if (hasNumberValue(packageValidationDurationMeanInMinutes) && hasNumberValue(packageValidationTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${packageValidationTotalRunCount} runs`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(packageValidationDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${packageValidationDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Validation"}
      middleText={getPackageValidationMeanData()}
      dataPoint={dataPoint}
    />
  );
}

SalesforcePackageValidationDurationDataBlock.propTypes = {
  packageValidationDurationMeanInMinutes: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  packageValidationTotalRunCount: PropTypes.number,
  dataPoint: PropTypes.object
};

export default SalesforcePackageValidationDurationDataBlock;
