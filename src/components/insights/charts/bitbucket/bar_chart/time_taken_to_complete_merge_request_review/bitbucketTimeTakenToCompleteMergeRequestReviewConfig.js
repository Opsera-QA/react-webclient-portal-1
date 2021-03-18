export default (getColor) => ({
  keys: ["MergeRequestTimeTaken"],
  indexBy: "AuthorName",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});
