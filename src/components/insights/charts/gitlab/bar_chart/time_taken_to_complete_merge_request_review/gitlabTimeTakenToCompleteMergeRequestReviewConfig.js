export default (getColor) => ({
  keys: ["Merge Request Time Taken"],
  indexBy: "AssigneeName",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});