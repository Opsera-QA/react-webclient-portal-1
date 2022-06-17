export default (keys, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  keys,
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  indexBy: "date",
  forceSquare: true,
  cellOpacity: 1,
  cellShape: "circle",
  hoverTarget: "cell",
  cellHoverOtherOpacity: .25,
  margin: {
    top: 10,
    right: 40,
    bottom: 60,
    left: 40
  },
  labelTextColor: "#ffffff"
});