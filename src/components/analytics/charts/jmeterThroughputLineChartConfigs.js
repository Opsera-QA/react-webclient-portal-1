export default {
  axisBottom: {
    "format": d => d.substring(0, 5),
    "orient": "bottom",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Build Number",
    "legendOffset": 36,
    "legendPosition": "middle"
  },
  axisLeft: {
    "orient": "left",
    "tickSize": 5, 
    "tickValues": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Throughput",
    "legendOffset": -60,
    "legendPosition": "middle"
  },
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "column",
      "justify": false,
      "translateX": 100,
      "translateY": 0,
      "itemsSpacing": 0,
      "itemDirection": "left-to-right",
      "itemWidth": 80,
      "itemHeight": 20,
      "itemOpacity": 0.75,
      "symbolSize": 12,
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