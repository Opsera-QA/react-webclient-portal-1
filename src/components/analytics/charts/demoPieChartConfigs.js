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
                "id": "ruby"
            },
            "id": "dots"
        },
        {
            "match": {
                "id": "c"
            },
            "id": "dots"
        },
        {
            "match": {
                "id": "go"
            },
            "id": "dots"
        },
        {
            "match": {
                "id": "python"
            },
            "id": "dots"
        },
        {
            "match": {
                "id": "scala"
            },
            "id": "lines"
        },
        {
            "match": {
                "id": "lisp"
            },
            "id": "lines"
        },
        {
            "match": {
                "id": "elixir"
            },
            "id": "lines"
        },
        {
            "match": {
                "id": "javascript"
            },
            "id": "lines"
        }
    ],
    legends: [
        {
            "anchor": "bottom",
            "direction": "row",
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