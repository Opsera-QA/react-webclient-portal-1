export default (getColor) => ({
  keys: ["Uncovered Lines", "line_coverage"],
  groupMode: "stacked",
  indexBy: "analysedAt",
  colorBy: "id",
  colors: getColor
});