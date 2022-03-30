import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcDurationByStageDataBlockBase from "../../SdlcDurationByStageDataBlockBase";

function SdlcDeployDurationMetric({ kpiConfiguration, dashboardData, meanData, countData, goalsData, metric, dataPoint }) {
  const getDataBlock = () => {
    return (
      <SdlcDurationByStageDataBlockBase
        topText={metric[0]?.id}
        meanData={meanData}
        countData={countData}
        goalsData={goalsData}
        dataPoint={dataPoint}
      />
    );
  };

  const getChart = () => {
    return (
      <SdlcDurationByStageBarChartBase
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        metric={metric}
      />
    );
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcDeployDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
  dataPoint: PropTypes.object
};

export default SdlcDeployDurationMetric;
