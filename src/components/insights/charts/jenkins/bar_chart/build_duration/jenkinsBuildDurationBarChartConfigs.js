export default (getColors) => ({
  keys: ["value"],
  indexBy: "key",
  colorBy: "id",
  colors: getColors
});