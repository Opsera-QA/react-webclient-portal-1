export default (getColor) => ({
  keys: ["numberOfIncidents"],
  indexBy: "priority",
  colorBy: "id",
  minValue: 0,
  layers: ["grid", "axes", "bars", "markers", "mesh"],
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
});