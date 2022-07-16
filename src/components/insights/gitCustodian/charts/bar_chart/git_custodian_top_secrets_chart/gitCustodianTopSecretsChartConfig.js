export default (getColor, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  keys: ["count"],
  indexBy: "commitHash",
  axisLeft: {
    tickSize: 5,
    tickValues: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Count",
    legendOffset: -50,
    legendPosition: "middle",
  },
  colorBy: "id",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ]
});