export default (getColor) => ({
  keys: ["Value"],
  indexBy: "key",
  colorBy: "id",
  colors: getColor
});