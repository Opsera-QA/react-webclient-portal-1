import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY  } from "components/common/helpers/metrics/metricTheme.helpers";

export default () => ({
  keys: ["Merge Request Time Taken"],
  indexBy: "_id",
  colorBy: "id",
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY ,
});