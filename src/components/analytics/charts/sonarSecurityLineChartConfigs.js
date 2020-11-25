export default {
  axisBottom: {
    format: "%b %d",
    tickRotation: -65,
    legendOffset: 40,
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
      "justify": false,
      "translateX": 110,
      "translateY": 50,
      "itemsSpacing": 0,
      "itemWidth": 100,
      "itemDirection": "left-to-right",
      "itemHeight": 20,
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