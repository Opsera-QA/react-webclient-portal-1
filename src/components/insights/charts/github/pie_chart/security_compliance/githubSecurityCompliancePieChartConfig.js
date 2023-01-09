export default (METRIC_THEME_CHART_PALETTE_COLORS) => ({
    sortByValue: true,
    innerRadius: 0,
    sliceLabelsSkipAngle: 10,
    sliceLabelsTextColor: "#ffffff",
    colors: [
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
    ],
    valueFormat: ">-~p",
    enableArcLinkLabels: false
});