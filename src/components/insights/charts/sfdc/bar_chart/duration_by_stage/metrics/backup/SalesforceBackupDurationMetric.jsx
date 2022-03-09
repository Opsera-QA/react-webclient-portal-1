import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceBackupDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/backup/SalesforceBackupDurationDataBlock";

function SalesforceBackupDurationMetric({
  kpiConfiguration,
  dashboardData,
  backupDurationMeanInMinutes,
  backupTotalRunCount,
  metric,
}) {
  const getDataBlock = () => {
    return (
      <SalesforceBackupDurationDataBlock
        backupDurationMeanInMinutes={backupDurationMeanInMinutes}
        backupTotalRunCount={backupTotalRunCount}
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

SalesforceBackupDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  backupDurationMeanInMinutes: PropTypes.number,
  backupTotalRunCount: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceBackupDurationMetric;
