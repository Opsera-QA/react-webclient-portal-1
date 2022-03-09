import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforceBackupDurationDataBlock({ backupDurationMeanInMinutes, backupTotalRunCount, kpiConfiguration, dataPoint }) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (dataPoint && hasNumberValue(backupDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, backupDurationMeanInMinutes);

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
      dataPoint={dataPoint}
    />
  );
}

SalesforceBackupDurationDataBlock.propTypes = {
  backupDurationMeanInMinutes: PropTypes.number,
  backupTotalRunCount: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dataPoint: PropTypes.object
};

export default SalesforceBackupDurationDataBlock;
