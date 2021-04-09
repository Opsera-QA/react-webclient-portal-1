export default (getColor) => ({
  keys: ["Time"],
  colorBy: "id",
  indexBy: "pipelineId",
  colors: getColor
});