import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceCreatePackageDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/create_package/SalesforceCreatePackageDurationDataBlock";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
function SalesforceCreatePackageDurationMetric({
  createPackageDurationMeanInMinutes,
  createPackageTotalRunCount,
  goalsData,
  metric,
  kpiConfiguration,
  dashboardData,
  dataPoint
}) {
  const getDataBlock = () => {
    return (
      <SalesforceCreatePackageDurationDataBlock
        createPackageDurationMeanInMinutes={createPackageDurationMeanInMinutes}
        createPackageTotalRunCount={createPackageTotalRunCount}
        goalsData={goalsData}
        kpiConfiguration={kpiConfiguration}
        dataPoint={dataPoint}
      />
    );
  };

  const getChart = () => {
    return (
      <SalesforceDurationByStageBarChartBase
        metric={metric}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceCreatePackageDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  createPackageDurationMeanInMinutes: PropTypes.number,
  createPackageTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
  dataPoint: PropTypes.object
};

export default SalesforceCreatePackageDurationMetric;
