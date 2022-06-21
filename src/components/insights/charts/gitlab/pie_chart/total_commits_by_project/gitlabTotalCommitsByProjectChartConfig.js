import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

export default () => ({
  keys: ["commits"],
  sortByValue: true,
  innerRadius: .5,
  sliceLabelsSkipAngle: 10,
  sliceLabelsTextColor: "#ffffff",
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
});