export default (getColor) => ({
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    useUTC: false,
  },
  yScale: {
    type: "linear",
    stacked: false,
  },
  xFormat: "time:%Y-%m-%d",
  colors: getColor,
});
