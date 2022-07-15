export default (getColor) => ({
    xScale: {
        type: "time",
        format: "%Y-%m-%d",
    },
    xFormat: "time:%Y-%m-%d",
    yScale: {
        type: "linear",
        stacked: false,
    },
    colors: getColor,
    pointSize: 7
});