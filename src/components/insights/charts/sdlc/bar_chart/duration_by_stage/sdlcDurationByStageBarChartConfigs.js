export default () => ({
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
  },
  yScale: {
    type: "linear",
    stacked: false,
  },
  layers: ["grid", "axes", "bars","lines", "markers"],
  xFormat: "time:%Y-%m-%d",
  axisLeft: {
    "format": d => (typeof d === "number") && (Math.floor(d) === d && d),
    "orient": "left",
    "tickSize": 0,
    "tickValues": 2,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Value",
    "legendOffset": -40,
    "legendPosition": "middle"
  }
  });