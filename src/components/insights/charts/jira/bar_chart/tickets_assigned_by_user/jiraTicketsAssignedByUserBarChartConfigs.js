export default (getColor) => ({
  keys: ["Count"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});