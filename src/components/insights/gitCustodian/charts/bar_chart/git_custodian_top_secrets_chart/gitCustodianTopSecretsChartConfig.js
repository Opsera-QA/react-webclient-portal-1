export default (getColor, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  keys: ["count"],
  indexBy: "commitHash",
  colorBy: "id",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ]
});