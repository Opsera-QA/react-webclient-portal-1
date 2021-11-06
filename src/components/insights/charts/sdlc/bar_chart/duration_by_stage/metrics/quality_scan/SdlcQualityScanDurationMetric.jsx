import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcQualityScanDurationDataBlock from "./SdlcQualityScanDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";

function SdlcQualityScanDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "container_scan_mean", goalsData, "average_quality_scan", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcQualityScanDurationDataBlock
        topText={metric[0]?.id}
        dataBlockValues={dataBlockValues}
        goalsData={goalsData}
      />
    );
  };

  const getChart = () => {
    return <SdlcDurationByStageBarChartBase metric={metric} />;
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcQualityScanDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcQualityScanDurationMetric;
