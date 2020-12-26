export default {
  margin: {
    "top": 50,
    "right": 110,
    "bottom": 65,
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
        "id": "fries"
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
    "format": d => { var date = new Date(d).toDateString() ; date = date.split(" "); return date[1]+" "+date[2]; },
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Code Coverage Metric",
    "legendPosition": "middle",
    "legendOffset": 32
  },
  axisLeft: {
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Value",
    "legendPosition": "middle",
    "legendOffset": -65
  },
  legends: [
    {
      "dataFrom": "keys",
      "anchor": "bottom-right",
      "direction": "column",
      "justify": false,
      "translateX": 120,
      "translateY": 0,
      "itemsSpacing": 2,
      "itemWidth": 100,
      "itemHeight": 20,
      "itemDirection": "left-to-right",
      "itemOpacity": 0.85,
      "symbolSize": 20,
      "effects": [
        {
          "on": "hover",
          "style": {
            "itemOpacity": 1
          }
        }
      ]
    }
  ]
};