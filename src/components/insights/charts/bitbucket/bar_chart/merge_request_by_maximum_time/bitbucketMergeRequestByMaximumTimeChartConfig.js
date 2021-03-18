export default (getColor) => ({
  keys: ["MergeRequestTimeTaken"],
  indexBy: "_id",
  colorBy: "id",
  colors: getColor
});