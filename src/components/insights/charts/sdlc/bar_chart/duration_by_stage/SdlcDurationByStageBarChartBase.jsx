import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./sdlcDurationByStageBarChartConfigs";
import {defaultConfig} from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";

function SdlcDurationByStageBarChartBase({ metric }) {
  return (
    <ResponsiveLine
      data={metric}
      {...defaultConfig(
        "Value",
        "Date",
        false,
        true,
        "wholeNumbers",
        "monthDate"
      )}
      {...config()}
      enableGridX={false}
      enableGridY={false}
      tooltip={(node) => (
        <ChartTooltip
          titles={["Date", "Mean Time"]}
          values={[
            node.point.data.xFormatted,
            String(node.point.data.yFormatted) + " minutes",
            node.point.data.count
          ]}
        />
      )}
    />
  );
}

SdlcDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
};

export default SdlcDurationByStageBarChartBase;