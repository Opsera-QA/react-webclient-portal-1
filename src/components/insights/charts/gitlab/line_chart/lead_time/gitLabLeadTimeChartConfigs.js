export default (getColor, maxValue) => ({
    keys: ["count"],
    indexBy: "_id",
    colorBy: "_id",
    minValue: 0,
    maxValue,
    colors: getColor,
    axisBottom: {
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
        "legend": "Lead Time (Days)",
        "legendOffset": 30,
        "legendPosition": "middle"
    },
});
