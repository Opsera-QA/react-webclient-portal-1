export default (getColor, MeanLineLayer, RollingMeanLineLayer) => ({
  indexBy: "date",
  xScale: {
            type: "time",
            format: "%Y-%m-%d",
            precision: "day",
          },
  xFormat: "time:%Y-%m-%d",
  yScale: { type: "linear", min: 0, max: "auto", stacked: false },
  colors: "#5B5851",
  layers: ["grid", "axes", MeanLineLayer, RollingMeanLineLayer, "nodes", "markers", "mesh", "legends"],
});