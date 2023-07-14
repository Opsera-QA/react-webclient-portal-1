export default () => ({
  keys: ["Success", "Failed"],
  indexBy: "_id",
  colorBy: "id",
  xScale: {
    type: "point",
  },
  yScale: {
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: false,
    reverse: false,
  },
  colors: ({ id, data }) => data[`${id}_color`],
});
