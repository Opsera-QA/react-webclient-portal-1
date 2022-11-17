export default (METRIC_THEME_CHART_PALETTE_COLORS) => ({
    xScale: {
        type: "time",
        format: "%Y-%m-%d",
    },
    xFormat: "time:%Y-%m-%d",
    yScale: {
        type: "linear",
        stacked: false,
    },
    colors: [
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
        METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3,
        //METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_4
    ],
    pointSize: 7
});