export default (getColor, maxValue) => ({
    keys: ["count"],
    indexBy: "_id",
    colorBy: "_id",
    minValue: 0,
    maxValue,
    colors: getColor,
    axisBottom: {
        // format: d => {if(isNaN(d)) return d; else return d+1 ; },
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
        "legend": "Lead Time (Days)",
        "legendOffset": 25,
        "legendPosition": "middle"
    },
});
