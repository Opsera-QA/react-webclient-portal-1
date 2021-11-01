import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";

import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcScriptsDurationDataBlock from "./SdlcScriptsDurationDataBlock";

function SdlcScriptsDurationMetric({ metric, mean, count, bottomText }) {
  const getDataBlock = () => {
    return <SdlcScriptsDurationDataBlock topText={metric[0].id} mean={mean} count={count} bottomText={bottomText} />;
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
  mean: PropTypes.number,
  count: PropTypes.number,
  bottomText: PropTypes.string,
};

export default SdlcScriptsDurationMetric;
