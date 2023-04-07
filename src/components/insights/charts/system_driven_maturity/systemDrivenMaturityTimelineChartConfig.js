import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

export default () => ({
  indexBy: "date",
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
    legend: "Issues",
    legendOffset: -45,
    legendPosition: "middle",
  },
  xFormat: "time:%Y-%m-%d",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
    ],
  pointSize: 6,
});
