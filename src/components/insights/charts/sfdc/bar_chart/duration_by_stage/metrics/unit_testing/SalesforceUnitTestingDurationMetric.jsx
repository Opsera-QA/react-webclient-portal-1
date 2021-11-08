import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforceUnitTestingDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/unit_testing/SalesforceUnitTestingDurationDataBlock";

function SalesforceProfileMigrationDurationMetric({ dataBlockValues, goalsData, metric }) {
  const getDataBlock = () => {
    return <SalesforceUnitTestingDurationDataBlock dataBlockValues={dataBlockValues} goalsData={goalsData} />;
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforceProfileMigrationDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.object,
};

export default SalesforceProfileMigrationDurationMetric;
