export default (getColor, maxValue) => ({
  keys: ["Mean Time to Restore"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  layers: ["grid", "axes", "bars", "markers", "mesh", "legends"],
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  label: d => `#${d.data.count}`
});
