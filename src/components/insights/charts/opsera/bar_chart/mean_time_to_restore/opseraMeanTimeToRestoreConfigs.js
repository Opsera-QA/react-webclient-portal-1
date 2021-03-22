export default (getColor, maxValue) => ({
  keys: ["Count"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  maxValue,
  colors: getColor
});