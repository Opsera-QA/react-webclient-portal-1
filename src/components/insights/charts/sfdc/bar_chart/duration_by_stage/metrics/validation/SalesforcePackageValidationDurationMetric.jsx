import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforcePackageValidationDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/validation/SalesforcePackageValidationDurationDataBlock";

function SalesforcePackageValidationDurationMetric({
  kpiConfiguration,
  dashboardData,
  packageValidationDurationMeanInMinutes,
  packageValidationTotalRunCount,
  metric,
  dataPoint
}) {
  const getDataBlock = () => {
    return (
      <SalesforcePackageValidationDurationDataBlock
        packageValidationDurationMeanInMinutes={packageValidationDurationMeanInMinutes}
        packageValidationTotalRunCount={packageValidationTotalRunCount}
        kpiConfiguration={kpiConfiguration}
        dataPoint={dataPoint}
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

SalesforcePackageValidationDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  packageValidationDurationMeanInMinutes: PropTypes.number,
  packageValidationTotalRunCount: PropTypes.number,
  metric: PropTypes.array,
  dataPoint: PropTypes.object
};

export default SalesforcePackageValidationDurationMetric;
