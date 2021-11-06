import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcTestDurationDataBlock from "./SdlcTestDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SdlcTestDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "testing_mean", goalsData, "average_test", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcTestDurationDataBlock topText={metric[0]?.id} dataBlockValues={dataBlockValues} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SdlcDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcTestDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcTestDurationMetric;
