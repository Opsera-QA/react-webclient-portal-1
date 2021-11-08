import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceDurationByStageBarChartBase from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";
import SalesforcePackageValidationDurationDataBlock from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/validation/SalesforcePackageValidationDurationDataBlock";

function SalesforcePackageValidationDurationMetric({ meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return (
      <SalesforcePackageValidationDurationDataBlock meanData={meanData} countData={countData} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SalesforceDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SalesforcePackageValidationDurationMetric.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SalesforcePackageValidationDurationMetric;
