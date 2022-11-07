export default (getColor, i) => ({
  keys: ["MTTR"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  label: (d) => `${d.data.Count}`,
  axisLeft: {
    legend: "Mean Time to Resolution (in hours)",
    format: (tickValue) => {
      i++;
      // Show alternate tick values 
      if (i % 2 === 0) {
        return "";
      } else {
        return tickValue;
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
