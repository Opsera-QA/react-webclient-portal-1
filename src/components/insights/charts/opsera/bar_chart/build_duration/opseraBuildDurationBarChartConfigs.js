export default (getColor) => ({
  keys: ["time"],
  colorBy: "id",
  indexBy: "pipelineId",
  colors: getColor
});