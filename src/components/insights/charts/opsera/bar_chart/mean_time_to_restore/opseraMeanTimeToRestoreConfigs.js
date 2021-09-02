export default (getColor, maxValue, MeanLineLayer) => ({
  keys: ["mttr"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  layers: ["grid", "axes", "bars", "markers", "mesh", MeanLineLayer, "legends"],
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  label: d => `#${d.data.count}`
});
