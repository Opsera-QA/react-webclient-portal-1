export default (getColor,i) => ({
  keys: ["Number of Incidents"],
  indexBy: "priority",
  colorBy: "id",
  minValue: 0,
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  axisLeft: {
    legend:"Number of Incidents",
    format: v => {
      i++;
      if(i%2===0){
        return '';
      }
      else {
        return v;
      }
    },
    orient: "left",
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: -40,
    legendPosition: "middle",
  }
});