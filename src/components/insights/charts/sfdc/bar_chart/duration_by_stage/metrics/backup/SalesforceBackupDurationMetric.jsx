import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceBackupDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/backup/SalesforceBackupDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SalesforceBackupDurationMetric({ meanData, countData, metric }) {
  const getDataBlock = () => {
    return <SalesforceBackupDurationDataBlock meanData={meanData} countData={countData} />;
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceBackupDurationMetric.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  metric: PropTypes.array,
};

export default SalesforceBackupDurationMetric;
