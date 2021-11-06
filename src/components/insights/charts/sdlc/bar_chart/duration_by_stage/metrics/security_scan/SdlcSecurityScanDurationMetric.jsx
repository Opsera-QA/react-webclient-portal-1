import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcSecurityScanDurationDataBlock from "./SdlcSecurityScanDurationDataBlock";
import { assignLineChartGoalColors } from "components/insights/charts/charts-views";
function SdlcSecurityScanDurationMetric({ dataBlockValues, goalsData, metric }) {
  if (dataBlockValues.length > 0 && goalsData) {
    assignLineChartGoalColors(dataBlockValues, "code_scan_mean", goalsData, "average_security_scan", metric);
  }

  const getDataBlock = () => {
    return (
      <SdlcSecurityScanDurationDataBlock
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

SdlcSecurityScanDurationMetric.propTypes = {
  dataBlockValues: PropTypes.array,
  goalsData: PropTypes.object,
  metric: PropTypes.array,
};

export default SdlcSecurityScanDurationMetric;
