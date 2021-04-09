export default (colors, today) => ({
  from: today.setFullYear(today.getFullYear() - 1),
  to: new Date(),
  emptyColor: "#ededed",
  colors,
  yearSpacing: 40,
  dayBorderWidth: 2,
  dayBorderColor: "white",
  monthBorderColor: "white",
  margin: {
    top: 30,
    right: 40,
    bottom: 30,
    left: 40
  },
});