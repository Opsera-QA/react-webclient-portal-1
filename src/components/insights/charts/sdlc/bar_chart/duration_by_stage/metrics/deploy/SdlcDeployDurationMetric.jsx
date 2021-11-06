import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcDeployDurationDataBlock from "./SdlcDeployDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SdlcDeployDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "deploy_mean", goalsData, "average_deploy", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcDeployDurationDataBlock topText={metric[0]?.id} dataBlockValues={dataBlockValues} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SdlcDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcDeployDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcDeployDurationMetric;
