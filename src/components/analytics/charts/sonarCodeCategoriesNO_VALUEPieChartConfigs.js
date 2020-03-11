export default {
  defs: [
    {
      "id": "dots",
      "type": "patternDots",
      "background": "inherit",
      "color": "rgba(255, 255, 255, 0.3)",
      "size": 4,
      "padding": 1,
      "stagger": true
    },
    {
      "id": "lines",
      "type": "patternLines",
      "background": "inherit",
      "color": "rgba(255, 255, 255, 0.3)",
      "rotation": -45,
      "lineWidth": 6,
      "spacing": 10
    }
  ],
  fill: [
    {
      "match": {
        "id": "bugs"
      },
      "id": "dots"
    },
    {
      "match": {
        "id": "code_smells"
      },
      "id": "dots"
    },
    {
      "match": {
        "id": "new_coverage"
      },
      "id": "dots"
    },
    {
      "match": {
        "id": "new_duplicated_lines_density"
      },
      "id": "dots"
    },
    {
      "match": {
        "id": "new_maintainability_rating"
      },
      "id": "lines"
    },
    {
      "match": {
        "id": "new_reliability_rating"
      },
      "id": "lines"
    },
    {
      "match": {
        "id": "new_security_rating"
      },
      "id": "lines"
    },
  ],
  legends: [
    {
      "anchor": "bottom-right",
      "direction": "column",
      "translateY": 56,
      "itemWidth": 100,
      "itemHeight": 18,
      "itemTextColor": "#999",
      "symbolSize": 18,
      "symbolShape": "circle",
      "effects": [
        {
          "on": "hover",
          "style": {
            "itemTextColor": "#000"
          }
        }
      ]
    }
  ]
};