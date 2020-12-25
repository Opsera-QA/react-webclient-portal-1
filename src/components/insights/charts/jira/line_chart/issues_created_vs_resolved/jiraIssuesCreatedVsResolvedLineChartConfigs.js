export default {
  keys: [
    "Subtask",
    "Story",
    "Task",
    "Bug"
  ],
  margin: {
    "top": 50,
    "right": 130,
    "bottom": 80,
    "left": 100
  },
  defs: [
    {
      "id": "dots",
      "type": "patternDots",
      "background": "inherit",
      "color": "#38bcb2",
      "size": 4,
      "padding": 1,
      "stagger": true
    },
    {
      "id": "lines",
      "type": "patternLines",
      "background": "inherit",
      "color": "#eed312",
      "rotation": -45,
      "lineWidth": 6,
      "spacing": 10
    }
  ],
  fill: [
    {
      "match": {
        "id": "donut"
      },
      "id": "dots"
    },
    {
      "match": {
        "id": "sandwich"
      },
      "id": "lines"
    }
  ],
  axisBottom: {
    "format": "%b %d",
    "tickValues": "every 2 days",
    "tickRotation": -65,
    "legendPosition": "middle",
    "legendOffset": 50
  },
  axisLeft: {
    "tickSize": 8,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Number of Issues",
    "legendPosition": "middle",
    "legendOffset": -60
  },
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "column",
      "justify": false,
      "translateX": 85,
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