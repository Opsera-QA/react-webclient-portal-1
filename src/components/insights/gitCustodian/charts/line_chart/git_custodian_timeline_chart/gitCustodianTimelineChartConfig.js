export default (getColor, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  indexBy: "date",
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    precision: "day",
  },
  yScale: {
    type: "linear",
    min: 0,
    max: "auto",
    stacked: false
  },
  curve: "step",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
    ],
});
