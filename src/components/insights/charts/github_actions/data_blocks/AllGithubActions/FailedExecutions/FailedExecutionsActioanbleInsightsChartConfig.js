export default (METRIC_THEME_CHART_PALETTE_COLORS) => ({
  keys: ["failure_percentage"],
  colorBy: "id",
  sortByValue: true,
  innerRadius: .5,
  sliceLabelsSkipAngle: 10,
  sliceLabelsTextColor: "#ffffff",
  enableArcLinkLabels: false,
  legends:[],
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
});