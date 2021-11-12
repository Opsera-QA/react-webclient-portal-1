import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforcePackageValidationDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/validation/SalesforcePackageValidationDurationDataBlock";

function SalesforcePackageValidationDurationMetric({
  kpiConfiguration,
  dashboardData,
  meanData,
  countData,
  goalsData,
  metric,
}) {
  const getDataBlock = () => {
    return (
      <SalesforcePackageValidationDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />
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

SalesforcePackageValidationDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SalesforcePackageValidationDurationMetric;
