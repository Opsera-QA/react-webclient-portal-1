export default (getColor) => ({
  keys: ["count"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});