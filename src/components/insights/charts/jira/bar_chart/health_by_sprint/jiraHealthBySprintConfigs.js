export default {
  keys: ["To Do", "In Development", "In Progress", "Peer Review", "Testing", "Done", "Selected for Development", "Production Deployment"],
  margin: {
    "top": 50,
    "right": 130,
    "bottom": 80,
    "left": 55
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
    "tickSize": 8,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Number of Issues",
    "legendPosition": "middle",
    "legendOffset": 50
  },
  axisLeft: {
    "tickSize": 8,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Project",
    "legendPosition": "middle",
    "legendOffset": -42.5
  },
  legends: [
    {
      "dataFrom": "keys",
      "anchor": "bottom-right",
      "direction": "column",
      "justify": true,
      "translateX": 120,
      "translateY": 62,
      "itemsSpacing": 3,
      "itemWidth": 110,
      "itemHeight": 30,
      "itemDirection": "bottom-to-top",
      "itemOpacity": 0.85,
      "symbolSize": 10,
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
