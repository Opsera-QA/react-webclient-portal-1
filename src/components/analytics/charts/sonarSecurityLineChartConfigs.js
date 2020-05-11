export default {
  axisBottom: {
    format: "%b %d",
    // legendOffset: -12,
    orient: "bottom",
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -65,
    legendOffset: 40,
    legendPosition: "middle"
  },
  axisLeft: {
    "orient": "left",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legendOffset": -40,
    "legendPosition": "middle"
  },
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "column",
      "justify": true,
      "translateX": 100,
      "translateY": 50,
      "itemsSpacing": 4,
      "itemWidth": 110,
      "itemDirection": "bottom-to-top",
      "itemHeight": 25,
      "itemOpacity": 0.75,
      "symbolSize": 10,
      "symbolShape": "circle",
      "symbolBorderColor": "rgba(0, 0, 0, .5)",
      "effects": [
        {
          "on": "hover",
          "style": {
            "itemBackground": "rgba(0, 0, 0, .03)",
            "itemOpacity": 1
          }
        }
      ]
    }
  ]
};