export default (getColor) => ({
  keys: ["Build Count"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});