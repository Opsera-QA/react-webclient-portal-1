export default (getColor) => ({
  keys: ["Merge Request Time Taken"],
  indexBy: "AuthorName",
  colorBy: "id",
  layout: "horizontal",
  colors: getColor
});
