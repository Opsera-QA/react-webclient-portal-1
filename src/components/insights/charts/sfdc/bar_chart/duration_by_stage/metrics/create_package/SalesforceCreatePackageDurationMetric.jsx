import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceCreatePackageDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/create_package/SalesforceCreatePackageDurationDataBlock";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";
function SalesforceCreatePackageDurationMetric({ meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return <SalesforceCreatePackageDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />;
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceCreatePackageDurationMetric.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
  metric: PropTypes.object,
};

export default SalesforceCreatePackageDurationMetric;
