export default {
    keys: [
      "count"
    ],
    margin: {
      "top": 50,
      "right": 110,
      "bottom": 50,
      "left": 120
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
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: 32,
      legendPosition: "middle",
    },
    axisLeft: {
      "format": (d) => Math.floor(d) === d && d,
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "Number of Deployments",
      "legendPosition": "middle",
      "legendOffset": -65
    },
    axisRight: {
      "format": (d) => Math.floor(d) === d && d,
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "Time (minutes)",
      "legendPosition": "middle",
      "legendOffset": 65
    },
    legends: [
      {
        "anchor": "top-right",
        "direction": "row",
        "justify": false,
        "translateX": 0,
        "translateY": -35,
        "itemsSpacing": 20,
        "itemDirection": "right-to-left",
        "itemWidth": 80,
        "itemHeight": 20,
        "itemOpacity": 1,
        "symbolSize": 10,
        "symbolShape": "square",
        "symbolBorderColor": "rgba(0, 0, 0, .5)"
      }
    ]
  };
  