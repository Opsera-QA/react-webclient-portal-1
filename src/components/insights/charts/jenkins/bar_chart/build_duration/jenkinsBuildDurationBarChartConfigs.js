export default (getColor) => ({
  keys: ["value"],
  indexBy: "key",
  colorBy: "id",
  colors: getColor
});