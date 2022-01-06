import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceUnitTestingDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/unit_testing/SalesforceUnitTestingDurationDataBlock";

function SalesforceProfileMigrationDurationMetric({
  kpiConfiguration,
  dashboardData,
  unitTestingDurationMeanInMinutes,
  unitTestingTotalRunCount,
  metric,
}) {
  const getDataBlock = () => {
    return (
      <SalesforceUnitTestingDurationDataBlock
        unitTestingDurationMeanInMinutes={unitTestingDurationMeanInMinutes}
        unitTestingTotalRunCount={unitTestingTotalRunCount}
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

SalesforceProfileMigrationDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  unitTestingDurationMeanInMinutes: PropTypes.number,
  unitTestingTotalRunCount: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceProfileMigrationDurationMetric;
