import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
export default () => ({
  margin: { top: 50, right: 20, bottom: 60, left: 60 },
  indexBy: "date",
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
  },
  xFormat: "time:%Y-%m-%d",
  yScale: {
    type: "linear",
    stacked: false,
  },
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  pointSize: 0
});
