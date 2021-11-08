import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./salesforceDurationByStageBarChartConfigs";
import { defaultConfig } from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";

function SalesforceDurationByStageBarChartBase({ metric }) {
  return (
    <ResponsiveLine
      data={metric}
      {...defaultConfig("Duration (min)", "Date", false, true, "wholeNumbers", "monthDate")}
      {...config()}
      enableGridX={false}
      enableGridY={false}
      tooltip={(node) => (
        <ChartTooltip
          titles={["Month", "Average Duration", "Number of Executions"]}
          values={[node.point.data.xFormatted, String(node.point.data.yFormatted) + " minutes", node.point.data.count]}
        />
      )}
    />
  );
}

SalesforceDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.object,
};

export default SalesforceDurationByStageBarChartBase;
