export default {
  keys: ["Commits"],
  margin: {
    top: 50,
    right: 130,
    bottom: 80,
    left: 80,
  },
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.3)",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.3)",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
  fill: [
    {
      match: {
        id: "fries",
      },
      id: "dots",
    },
    {
      match: {
        id: "sandwich",
      },
      id: "lines",
    },
  ],
  axisBottom: {
    format: (d) => (typeof d === "string" ? d.substring(0, 6) : ""),
    tickSize: 8,
    tickPadding: 5,
    tickRotation: -45,
    legend: "Project",
    legendPosition: "middle",
    legendOffset: 60,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Commits",
    legendPosition: "middle",
    legendOffset: -65,
  },
  legends: [
    {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 40,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
};
