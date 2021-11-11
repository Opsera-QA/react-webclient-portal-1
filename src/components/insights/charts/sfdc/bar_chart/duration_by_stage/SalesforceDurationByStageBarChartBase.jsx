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
          titles={["Date Range", "Average Duration", "Number of Executions"]}
          values={[
            node.point.data.range,
            String(node.point.data.yFormatted) + " minutes",
            node.point.data.count + " runs",
          ]}
        />
      )}
    />
  );
}

SalesforceDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
};

export default SalesforceDurationByStageBarChartBase;
