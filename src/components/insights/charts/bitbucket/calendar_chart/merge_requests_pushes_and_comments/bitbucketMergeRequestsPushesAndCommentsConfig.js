export default (colors, today) => ({
  from: today.setFullYear(today.getFullYear() - 1),
  to: new Date(),
  emptyColor: "#ededed",
  colors,
  yearSpacing: 40,
  dayBorderWidth: 2,
  dayBorderColor: "white",
  monthBorderColor: "white",
});