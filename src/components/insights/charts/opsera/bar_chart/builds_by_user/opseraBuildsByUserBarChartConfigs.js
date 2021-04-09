export default (getColor) => ({
  keys: ["Value"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});