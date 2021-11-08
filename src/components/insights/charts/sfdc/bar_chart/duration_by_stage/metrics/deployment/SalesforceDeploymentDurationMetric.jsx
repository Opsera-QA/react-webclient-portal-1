import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceDeploymentDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/deployment/SalesforceDeploymentDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";
function SalesforceDeploymentDurationMetric({ meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return <SalesforceDeploymentDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />;
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceDeploymentDurationMetric.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceDeploymentDurationMetric;
