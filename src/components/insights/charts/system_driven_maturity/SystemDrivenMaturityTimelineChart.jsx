import React from "react";
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import ChartTooltip from 'components/insights/charts/ChartTooltip';
import { defaultConfig } from 'components/insights/charts/charts-views';
import { MATURITY_SCORE_TEXT_TO_LABEL } from "../charts-helpers";

function SystemDrivenMaturityTimelineChart ({ data }) {
  return (
    <ResponsiveLine
      data={data}
      {...defaultConfig("", "Date", false, true, "numbers", "monthDate2")}
      colors={[
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4
      ]}
      enableGridX={false}
      xFormat="time:%Y-%m-%d"
      axisBottom={{
        format: d => { var date = new Date(d).toUTCString(); date = date.split(" "); return date[2]+" "+date[1]; },
        tickRotation: -45,
        legend: 'Date',
        legendOffset: 55,
        legendPosition: 'middle'
      }}
      enableGridY={false}
      axisLeft={{
        tickValues: [1, 2, 3, 4],
        format: score => MATURITY_SCORE_TEXT_TO_LABEL[score],
        legend: "Maturity Score",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      yScale={{
        type: "linear",
        min: 0,
        max: 4,
        stacked: false,
        reverse: false,
      }}
      pointSize={10}
      margin={{
        top: 40,
        bottom: 80,
        left: 80,
        right: 80
      }}
      legends={[
        {
          anchor: "right",
          direction: "column",
          itemWidth: 10,
          itemHeight: 10,
          itemsSpacing: 15,
          translateX: 30
        }
      ]}
      tooltip={(node) => (
        <ChartTooltip
          titles={["Date Range", "Maturity Score"]}
          values={[node.point.data.range, node.point.data.sdmScoreText]}
        />
      )}
    />
  );
}

SystemDrivenMaturityTimelineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number,
          range: PropTypes.string,
          sdmScore: PropTypes.number,
          sdmScoreText: PropTypes.string
        })
      )
    })
  )
};

export default SystemDrivenMaturityTimelineChart;