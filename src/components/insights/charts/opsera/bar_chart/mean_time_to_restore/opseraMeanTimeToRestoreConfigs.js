export default (getColor, maxValue, MeanLineLayer) => ({
  keys: ["Count"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  maxValue,
  layers: ["grid", "axes", "bars", MeanLineLayer, "markers", "mesh", "legends"],
  colors: getColor
});