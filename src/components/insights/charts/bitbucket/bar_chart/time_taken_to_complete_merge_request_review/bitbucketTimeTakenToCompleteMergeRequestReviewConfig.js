export default (getColor) => ({
  keys: ["MergeRequestTimeTaken"],
  indexBy: "AssigneeName",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});
