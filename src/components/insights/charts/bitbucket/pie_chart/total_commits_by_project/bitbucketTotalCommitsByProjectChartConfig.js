export default (getColor) => ({
  keys: ["commits"],
  sortByValue: true,
  innerRadius: .5,
  sliceLabelsSkipAngle: 10,
  sliceLabelsTextColor: "#ffffff",
  colors: getColor
});