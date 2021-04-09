export default (getColor) => ({
  xScale: { type: "point" },
  yScale: { 
    type: "linear", 
    min: "auto", 
    max: "auto", 
    stacked: true, 
    reverse: false 
  },
  colors: getColor
});