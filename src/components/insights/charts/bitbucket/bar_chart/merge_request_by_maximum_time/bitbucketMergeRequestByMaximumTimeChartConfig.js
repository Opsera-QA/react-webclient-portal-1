export default (getColor) => ({
  keys: ["Merge Request Time Taken"],
  indexBy: "_id",
  colorBy: "id",
  colors: getColor
});