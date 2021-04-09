export default () => ({
  keys: ["Committed", "Completed"],
  indexBy: "_id",
  colorBy: "id",
  groupMode: "grouped",
  colors:({ id, data }) => data[`${id}_color`]
});