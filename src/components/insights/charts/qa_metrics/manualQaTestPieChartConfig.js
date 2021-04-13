export default (getColor) => ({
  keys: ["tests"],
  sortByValue: true,
  innerRadius: .5,
  sliceLabelsSkipAngle: 10,
  sliceLabelsTextColor: "#ffffff",
  colors: getColor
});