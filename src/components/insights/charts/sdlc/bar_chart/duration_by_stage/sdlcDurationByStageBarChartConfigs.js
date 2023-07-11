export default (METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY) => ({
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    useUTC: false
  },
  yScale: {
    type: "linear",
    stacked: false,
  },
  xFormat: "time:%Y-%m-%d",
  // legends: [],
  colors: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
  axisLeft: {
    "format": d => (typeof d === "number") && (Math.floor(d) === d && d),
    "orient": "left",
    "tickSize": 0,
    "tickValues": 2,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Duration (min)",
    "legendOffset": -40,
    "legendPosition": "middle"
  },
  axisBottom: {
    "format": "%b",
    "orient": "bottom",
    "tickSize": 5,
    "tickValues": 'every month',
    "tickPadding": 5,
    "tickRotation": -45,
    "legend": "Month",
    "legendOffset": 60,
    "legendPosition": "middle",
  },
});
