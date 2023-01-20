export default (getColor, i) => ({
  keys: ["Number of Incidents"],
  indexBy: "priority",
  colorBy: "id",
  minValue: 0,
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  axisLeft: {
    legend: "Number of Incidents",
    format: (tickValues) => {
      i++;
      // Show alternate tick values 
      if (i % 2 === 0) {
        return "";
      } else {
        return tickValues;
      }
    },
    orient: "left",
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: -40,
    legendPosition: "middle",
  },
});
