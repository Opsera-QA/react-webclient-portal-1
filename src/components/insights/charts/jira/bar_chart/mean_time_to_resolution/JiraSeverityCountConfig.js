export default (getColor) => ({
  keys: ["Number of Incidents"],
  indexBy: "priority",
  colorBy: "id",
  minValue: 0,
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
});