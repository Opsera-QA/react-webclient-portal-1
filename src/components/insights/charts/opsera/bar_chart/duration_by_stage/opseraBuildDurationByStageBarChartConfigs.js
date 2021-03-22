export default {
  keys: [
    "Build",
    "Script",
    "Code Scan",
    "Container Scan",
    "Unit Testing",
    "Functional Testing",
    "Approval",
    "Repository Upload",
    "Deploy"
  ],
  margin: {
    "top": 50,
    "right": 110,
    "bottom": 50,
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
    "format": (d) => (typeof d === "string" ? d.substring(0, 3) : ""),
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Pipeline Run",
    "legendPosition": "middle",
    "legendOffset": 32
  },
  axisLeft: {
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "Duration (Minutes)",
    "legendPosition": "middle",
    "legendOffset": -65
  },
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "column",
      "justify": false,
      "translateX": 100,
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
