export default (keys) => ({
  keys: keys,
  indexBy: "project",
  colorBy: "id",
  layout: "horizontal",
  // colors:({ id, data }) => data[`${id}_color`]
});