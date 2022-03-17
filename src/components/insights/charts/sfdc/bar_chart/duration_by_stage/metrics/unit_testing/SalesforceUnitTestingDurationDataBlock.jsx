import React from "react";
import PropTypes from "prop-types";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase, {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforceUnitTestingDurationDataBlock({ unitTestingDurationMeanInMinutes, unitTestingTotalRunCount, dataPoint }) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint && hasNumberValue(unitTestingDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, unitTestingDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
    }
  };

  const getUnitTestingMeanData = () => {
    const qualityLevel = getMetricQualityLevel();
    if (hasNumberValue(unitTestingDurationMeanInMinutes) && hasNumberValue(unitTestingTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${unitTestingDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${unitTestingTotalRunCount} runs`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(unitTestingDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${unitTestingDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Unit Testing"}
      middleText={getUnitTestingMeanData()}
      dataPoint={dataPoint}
    />
  );
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
  unitTestingDurationMeanInMinutes: PropTypes.number,
  unitTestingTotalRunCount: PropTypes.number,
  dataPoint: PropTypes.object
};

export default SalesforceUnitTestingDurationDataBlock;
