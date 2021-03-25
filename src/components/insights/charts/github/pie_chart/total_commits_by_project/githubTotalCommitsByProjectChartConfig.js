export default (getColor) => ({
  keys: ["commits"],
  sortByValue: true,
  innerRadius: .5,
  colors: getColor
});