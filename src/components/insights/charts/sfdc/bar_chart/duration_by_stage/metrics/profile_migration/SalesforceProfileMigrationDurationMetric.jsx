import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceProfileMigrationDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/profile_migration/SalesforceProfileMigrationDurationDataBlock";

function SalesforceProfileMigrationDurationMetrics({ meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return (
      <SalesforceProfileMigrationDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceProfileMigrationDurationMetrics.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SalesforceProfileMigrationDurationMetrics;
