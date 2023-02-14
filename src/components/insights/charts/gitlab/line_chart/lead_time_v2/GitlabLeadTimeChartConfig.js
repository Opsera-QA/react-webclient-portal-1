import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

export default (maxDate) => ({
  margin: { top: 20, right: 100, bottom: 50, left: 120 },
  xScale: {
    type: "time",
    precision: "second",
    max: maxDate ? maxDate : 'auto'
  },
  axisBottom: {
    format: "%b %d",
    legend: "Deployments",
    legendPosition: "middle",
    legendOffset: 30,
  },
  axisLeft: {
    legend: "Hours",
    legendPosition: "middle",
    legendOffset: -30,
  },
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
  ],
});
