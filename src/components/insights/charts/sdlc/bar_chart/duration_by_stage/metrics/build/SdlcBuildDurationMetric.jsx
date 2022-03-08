import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcDurationByStageDataBlockBase from "../../SdlcDurationByStageDataBlockBase";
import {dataPointHelpers} from "../../../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {SDLC_DURATION_BY_STAGE_METRICS_CONSTANTS as constants} from "../../SDLCDurationByStageMetrics_kpi_datapoint_identifiers";

function SdlcBuildDurationMetric({ kpiConfiguration, dashboardData, meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    const buildDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.BUILD_DURATION_DATA_POINT);
    return (
      <SdlcDurationByStageDataBlockBase
        topText={metric[0]?.id}
        meanData={meanData}
        countData={countData}
        goalsData={goalsData}
        dataPoint={buildDataPoint}
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

SdlcBuildDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
};

export default SdlcBuildDurationMetric;
