import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import LeadTimeAndReleaseDurationBarChartBase from "../../LeadTimeAndReleaseDurationBarChartBase";
import LeadTimeAndReleaseDurationDataBlockBase from "../../../data_blocks/LeadTimeAndReleaseDurationDataBlockBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
// TODO
import {SDLC_DURATION_BY_STAGE_METRICS_CONSTANTS as constants} from "../SDLCDurationByStageMetrics_kpi_datapoint_identifiers";

function LeadTimeAndReleaseDurationDeployMetric({ kpiConfiguration, dashboardData, meanData, countData, goalsData, metric, className }) {

  console.log('data - metric: ', className);

  const getDataBlock = () => {
    // TODO
    const deployDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
    constants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOY_DURATION_DATA_POINT);
    
    return (
      <LeadTimeAndReleaseDurationDataBlockBase
        topText={(metric && metric[0]?.id) ? metric[0].id : '' }
        meanData={meanData}
        countData={countData}
        goalsData={goalsData}
        dataPoint={deployDataPoint}
      />
    );
  };

  const getChart = () => {
    return (
      <LeadTimeAndReleaseDurationBarChartBase
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        metric={metric}
      />
    );
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} className={className}/>;
}

LeadTimeAndReleaseDurationDeployMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
  className: PropTypes.string
};

export default LeadTimeAndReleaseDurationDeployMetric;
