export default (getColor) => ({
  keys: ["Merge Requests"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});
