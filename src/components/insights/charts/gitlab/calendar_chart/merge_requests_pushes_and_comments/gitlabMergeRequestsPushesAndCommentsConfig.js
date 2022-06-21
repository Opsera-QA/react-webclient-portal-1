import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

export default (today) => ({
  from: today.setFullYear(today.getFullYear() - 1),
  to: new Date(),
  emptyColor: "#ededed",
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
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