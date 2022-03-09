import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {
  SALESFORCE_DURATION_BY_STAGE_METRICS_CONSTANTS as constants
} from "../../SalesforceDurationByStageMetrics_kpi_datapoint_identifiers";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforceBackupDurationDataBlock({ backupDurationMeanInMinutes, backupTotalRunCount, kpiConfiguration }) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const backupDurationDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.BACKUP_DURATION_DATA_POINT);

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (backupDurationDataPoint && hasNumberValue(backupDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(backupDurationDataPoint, backupDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
    }
  };

  const getBackupMeanData = () => {
    const qualityLevel = getMetricQualityLevel();
    if (hasNumberValue(backupDurationMeanInMinutes) && hasNumberValue(backupTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${backupTotalRunCount} runs`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(backupDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${backupDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Backups"}
      middleText={getBackupMeanData()}
      dataPoint={backupDurationDataPoint}
    />
  );
}

SalesforceBackupDurationDataBlock.propTypes = {
  backupDurationMeanInMinutes: PropTypes.number,
  backupTotalRunCount: PropTypes.number,
  kpiConfiguration: PropTypes.object
};

export default SalesforceBackupDurationDataBlock;
