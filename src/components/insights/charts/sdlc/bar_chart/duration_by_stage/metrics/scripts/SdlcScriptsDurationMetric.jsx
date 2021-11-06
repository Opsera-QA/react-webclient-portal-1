import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcScriptsDurationDataBlock from "./SdlcScriptsDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SdlcScriptsDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "script_mean", goalsData, "average_scripts", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcScriptsDurationDataBlock topText={metric[0]?.id} dataBlockValues={dataBlockValues} goalsData={goalsData} />
    );
  };

  const getChart = () => {
    return <SdlcDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcScriptsDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcScriptsDurationMetric;
