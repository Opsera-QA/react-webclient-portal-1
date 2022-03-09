import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase, { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforceDeploymentDurationDataBlock({
  deploymentDurationMeanInMinutes,
  deploymentTotalRunCount,
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
    if (!hasPositiveNumberValue(deploymentDurationMeanInMinutes) || !hasPositiveNumberValue(goalsData)) {
      return;
    }

    if (dataPoint) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, deploymentDurationMeanInMinutes);

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
            <MetricTextBase formattedText={`${deploymentDurationMeanInMinutes} min`} qualityLevel={qualityLevel} className={"metric-block-content-text"}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${deploymentTotalRunCount} runs`} qualityLevel={qualityLevel} className={"metric-block-content-text"}/>
          </div>
        </>
      );
    }
    return <span className={"metric-block-content-text"}> Error! </span>;
  };
  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Deployment"}
      middleText={getDeploymentMeanBlock()}
      dataPoint={dataPoint}
    />
  );
}

SalesforceDeploymentDurationDataBlock.propTypes = {
  deploymentDurationMeanInMinutes: PropTypes.number,
  deploymentTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dataPoint: PropTypes.object
};

export default SalesforceDeploymentDurationDataBlock;
