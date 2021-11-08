import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceBackupDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/backup/SalesforceBackupDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SalesforceBackupDurationMetric({ meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return <SalesforceBackupDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />;
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceBackupDurationMetric.propTypes = {
  meanData: PropTypes.array,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
  metric: PropTypes.object,
};

export default SalesforceBackupDurationMetric;
