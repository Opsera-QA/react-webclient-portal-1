export default {
  keys: ["commits"],
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
      anchor: "top-right",
      direction: "column",
      translateX: 40,
      translateY: -30,
      itemWidth: 100,
      itemHeight: 18,
      itemTextColor: "#999",
      symbolSize: 18,
      symbolShape: "circle",
      itemsSpacing: 1,
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#000",
          },
        },
      ],
    },
  ],
};
