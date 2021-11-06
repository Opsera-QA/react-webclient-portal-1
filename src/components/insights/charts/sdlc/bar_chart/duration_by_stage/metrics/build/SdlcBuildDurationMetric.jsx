import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcBuildDurationDataBlock from "./SdlcBuildDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SdlcBuildDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "build_mean", goalsData, "average_builds", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcBuildDurationDataBlock topText={metric[0]?.id} dataBlockValues={dataBlockValues} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SdlcDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcBuildDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcBuildDurationMetric;
