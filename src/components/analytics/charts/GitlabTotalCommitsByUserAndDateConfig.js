export default {
  margin: {
    "top": 40,
    "right": 40,
    "bottom": 40,
    "left": 40
  },
  axisLeft: {
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Date',
    legendPosition: 'middle',
    legendOffset: -90,
    // format: "%b %d"
  },
  axisBottom: { 
    format: d => d.substring(0, 6), 
    orient: "bottom", 
    tickSize: 2, 
    tickPadding: 2, 
    tickRotation: -45, legend: "", 
    legendOffset: 36 
  },
  defs: [
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "rgba(0, 0, 0, 0.1)",
      rotation: -45,
      lineWidth: 4,
      spacing: 7
    }
  ],
  fill: [ { id: "lines" } ],
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "row",
      "translateY": 36,
      "itemCount": 4,
      "itemWidth": 42,
      "itemHeight": 36,
      "itemsSpacing": 14,
      "itemDirection": "right-to-left"
    }                
  ]
};