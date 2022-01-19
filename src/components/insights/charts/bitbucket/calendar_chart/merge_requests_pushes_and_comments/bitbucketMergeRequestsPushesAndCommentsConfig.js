export default (colors, today, METRIC_THEME_CHART_PALETTE_COLORS) => ({
  from: today.setFullYear(today.getFullYear() - 1),
  to: new Date(),
  emptyColor: "#ededed",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  yearSpacing: 40,
  dayBorderWidth: 2,
  dayBorderColor: "white",
  monthBorderColor: "white",
  margin: {
    top: 30,
    right: 40,
    bottom: 30,
    left: 40
  },
});