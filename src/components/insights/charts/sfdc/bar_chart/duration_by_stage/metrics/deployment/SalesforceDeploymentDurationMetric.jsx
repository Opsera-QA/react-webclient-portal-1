import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceDeploymentDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/deployment/SalesforceDeploymentDurationDataBlock";
function SalesforceDeploymentDurationMetric({
  kpiConfiguration,
  dashboardData,
  deploymentDurationMeanInMinutes,
  deploymentTotalRunCount,
  goalsData,
  metric,
}) {
  const getDataBlock = () => {
    return (
      <SalesforceDeploymentDurationDataBlock
        deploymentDurationMeanInMinutes={deploymentDurationMeanInMinutes}
        deploymentTotalRunCount={deploymentTotalRunCount}
        goalsData={goalsData}
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

SalesforceDeploymentDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  deploymentDurationMeanInMinutes: PropTypes.number,
  deploymentTotalRunCount: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceDeploymentDurationMetric;
