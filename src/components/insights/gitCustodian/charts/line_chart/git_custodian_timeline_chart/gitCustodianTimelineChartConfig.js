export default (getColor, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  indexBy: "date",
  // xScale: {
  //   type: "time",
  //   format: "%Y-%m-%d",
  //   precision: "day",
  // },
  yScale: {
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: false
  },
  axisLeft: {
    tickSize: 5,
    tickValues: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Issues Added",
    legendOffset: -45,
    legendPosition: "middle",
  },
  xFormat: "time:%Y-%m-%d",
  curve: "step",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  pointSize: 6
});
