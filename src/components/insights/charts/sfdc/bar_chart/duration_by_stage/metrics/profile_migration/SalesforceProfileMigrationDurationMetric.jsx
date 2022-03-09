import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceProfileMigrationDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/profile_migration/SalesforceProfileMigrationDurationDataBlock";

function SalesforceProfileMigrationDurationMetrics({
  kpiConfiguration,
  dashboardData,
  profileMigrationDurationMeanInMinutes,
  profileMigrationTotalRunCount,
  metric,
}) {
  const getDataBlock = () => {
    return (
      <SalesforceProfileMigrationDurationDataBlock
        profileMigrationDurationMeanInMinutes={profileMigrationDurationMeanInMinutes}
        profileMigrationTotalRunCount={profileMigrationTotalRunCount}
        kpiConfiguration={kpiConfiguration}
      />
    );
  };

  const getChart = () => {
    return (
      <SalesforceDurationByStageBarChartBase
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        metric={metric}
      />
    );
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceProfileMigrationDurationMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  profileMigrationDurationMeanInMinutes: PropTypes.number,
  profileMigrationTotalRunCount: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceProfileMigrationDurationMetrics;
