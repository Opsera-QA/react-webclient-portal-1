export default () => ({
  keys: [
    "Build",
    "Script",
    "Code Scan",
    "Container Scan",
    "Unit Testing",
    "Functional Testing",
    "Approval",
    "Repository Upload",
    "Deploy"
  ],
  indexBy: "pipelineId",
  colorBy: "id",
  colors: ({ id, data }) => data[`${id}_color`]
});