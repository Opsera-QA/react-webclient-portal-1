import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceCreatePackageDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/create_package/SalesforceCreatePackageDurationDataBlock";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
function SalesforceCreatePackageDurationMetric({
  meanData,
  countData,
  goalsData,
  metric,
  kpiConfiguration,
  dashboardData,
}) {
  const getDataBlock = () => {
    return <SalesforceCreatePackageDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />;
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
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceCreatePackageDurationMetric;
