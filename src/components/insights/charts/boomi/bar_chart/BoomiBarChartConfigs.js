import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

export const config = () => ({
  keys: ["priority","y","migratePackage","deployPackage"],
  indexBy: "priority",
  colorBy: "priority",
  minValue: 0,
  groupMode:"grouped",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  enableLabel: true,
 // labelTextColor: "white",
 // label: (d) => `${d.data.Count}`,
});


export const config2=() => ({
  keys: ["Create Package","Migrate Package","Deploy Package"],
  indexBy: "priority",
  colorBy: "id",
  minValue: 0,
  groupMode:"grouped",
  colors: [
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4,
    METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_5,
  ],
  // enableLabel: true,
 // labelTextColor: "white",
 // label: (d) => `${d.data.Count}`,
});
