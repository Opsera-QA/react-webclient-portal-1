export default (getColor) => ({
  keys: ["uncovered_lines", "line_coverage"],
  groupMode: "stacked",
  indexBy: "analysedAt",
  colorBy: "id",
  colors: getColor
});