export default (getColor) => ({
  keys: ["value"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});