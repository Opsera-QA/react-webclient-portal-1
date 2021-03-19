export default (getColor) => ({
  keys: ["Subtask", "Story", "Task", "Bug"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});