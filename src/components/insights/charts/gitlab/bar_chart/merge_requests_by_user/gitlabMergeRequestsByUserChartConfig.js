import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

export default () => ({
  keys: ["Merge Requests"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY ,
});
