import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SalesforceCreatePackageDurationDataBlock
  from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/create_package/SalesforceCreatePackageDurationDataBlock";
import SalesforceDurationByStageBarChartBase
  from "components/insights/charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageBarChartBase";

function SalesforceCreatePackageDurationMetric({dataBlockValues, goalsData, metric}) {
  if (dataBlockValues[0]?.create_package_mean < goalsData.average_builds) {metric[0].color = "#26cf26";}
  if (dataBlockValues[0]?.create_package_mean > goalsData.average_builds) {metric[0].color = "#E57373";}

  const getDataBlock = () => {
    return (
      <SalesforceCreatePackageDurationDataBlock
        dataBlockValues={dataBlockValues}
        goalsData={goalsData}
      />
    );
  };

  const getChart = () => {
    return (
      <SalesforceDurationByStageBarChartBase
        metric={metric}
      />
    );
  };

  return (
    <DataBlockAndChartContainer
      dataBlock={getDataBlock()}
      chart={getChart()}
    />
  );
}

SalesforceCreatePackageDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.object,
};

export default SalesforceCreatePackageDurationMetric;
