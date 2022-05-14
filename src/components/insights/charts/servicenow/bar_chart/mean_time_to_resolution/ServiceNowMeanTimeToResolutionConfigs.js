export default (getColor) => ({
  keys: ["MTTR"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  label: (d) => `${d.data.Count}`,
});
