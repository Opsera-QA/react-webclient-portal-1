import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

export default (keys) => ({
  keys,
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
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