import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockBase from "../../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import "../../salesforce-duration-by-stage-kpi.css";
import MetricTextBase from "components/common/metrics/text/MetricTextBase";
import {
  SALESFORCE_DURATION_BY_STAGE_METRICS_CONSTANTS as constants
} from "../../SalesforceDurationByStageMetrics_kpi_datapoint_identifiers";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function SalesforceProfileMigrationDurationDataBlock({
  profileMigrationDurationMeanInMinutes,
  profileMigrationTotalRunCount,
  kpiConfiguration
}) {
  const hasNumberValue = (potentialNumber) => {
    return potentialNumber == undefined || potentialNumber == null || typeof potentialNumber !== "number"
      ? false
      : true;
  };

  const profileMigrationDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.PROFILE_MIGRATION_DATA_POINT);

  const getMetricQualityLevel = () => {

    // TODO: allow existing data points to use their quality level but eventually require the use of strategic criteria
    if (profileMigrationDataPoint && hasNumberValue(profileMigrationDurationMeanInMinutes)) {
      const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(profileMigrationDataPoint, profileMigrationDurationMeanInMinutes);

      if (typeof evaluatedDataPoint === "string") {
        return evaluatedDataPoint;
      }
    }
  };

  const getProfileMigrationMeanData = () => {
    const qualityLevel = getMetricQualityLevel();
    if (hasNumberValue(profileMigrationDurationMeanInMinutes) && hasNumberValue(profileMigrationTotalRunCount)) {
      return (
        <>
          <div>
            <MetricTextBase formattedText={`${profileMigrationDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
          <div>
            <MetricTextBase formattedText={`${profileMigrationTotalRunCount} runs`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>
          </div>
        </>
      );
    }
    if (hasNumberValue(profileMigrationDurationMeanInMinutes)) {
      return <MetricTextBase formattedText={`${profileMigrationDurationMeanInMinutes} min`} className={"metric-block-content-text"} qualityLevel={qualityLevel}/>;
    }
    return <span className={"metric-block-content-text"}> No runs </span>;
  };

  return (
    <ThreeLineDataBlockBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Profile Migration"}
      middleText={getProfileMigrationMeanData()}
      dataPoint={profileMigrationDataPoint}
    />
  );
}

SalesforceProfileMigrationDurationDataBlock.propTypes = {
  profileMigrationDurationMeanInMinutes: PropTypes.number,
  profileMigrationTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object
};

export default SalesforceProfileMigrationDurationDataBlock;
