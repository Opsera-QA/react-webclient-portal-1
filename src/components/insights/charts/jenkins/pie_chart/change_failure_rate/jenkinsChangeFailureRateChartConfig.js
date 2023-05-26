export default (METRIC_THEME_CHART_PALETTE_COLORS) => ({
    keys: ["failureRate"],
    sortByValue: true,
    innerRadius: 0,
    sliceLabelsSkipAngle: 10,
    sliceLabelsTextColor: "#ffffff",
    margin: { top: 20, right: 20, bottom: 50 },
    enableArcLinkLabels:false,
    colors: [
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
    ],
});