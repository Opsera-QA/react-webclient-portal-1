import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

export default (getColor, MeanLineLayer, RollingMeanLineLayer) => ({
  indexBy: "date",
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    precision: "day",
  },
  xFormat: "time:%Y-%m-%d",
  yScale: { type: "linear", min: 0, max: "auto", stacked: false },
  colors: METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
  layers: ["grid", "axes", MeanLineLayer, RollingMeanLineLayer, "nodes", "markers", "mesh"],
});
