export default (getColor) => ({
  indexBy: "date",
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    precision: "day",
  },
  yScale: { 
    type: "linear", 
    min: 0, 
    max: "auto", 
    stacked: false
  },
  curve: "step",
  colors: getColor
});