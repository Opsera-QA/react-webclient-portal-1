export default {
  axisBottom: {
    "format": d => { var date = new Date(d).toDateString() ; date = date.split(" "); return date[1]+" "+date[2]; },
    "orient": "bottom",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": -65,
    "legendOffset": 36,
    "legendPosition": "middle"
  },
  axisLeft: {
    "orient": "left",
    "tickSize": 5, 
    "tickValues": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Time in minutes",
    "legendOffset": -40,
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