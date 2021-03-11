export default {
  keys: ["MergeRequestTimeTaken"],
  margin: {
    top: 50,
    right: 110,
    bottom: 80,
    left: 115,
  },
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "#38bcb2",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "#eed312",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
  fill: [
    {
      match: {
        id: "donut",
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
    tickSize: 8,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Time (Hours)",
    legendPosition: "middle",
    legendOffset: 50,
  },
  axisLeft: {
    format: (d) => (typeof d === "string" ? d.substring(0, 6) : ""),
    tickSize: 8,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Reviewer",
    legendPosition: "middle",
    legendOffset: -80,
  },
  legends: [
    {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: true,
      translateX: 125,
      translateY: 62,
      itemsSpacing: 3,
      itemWidth: 110,
      itemHeight: 30,
      itemDirection: "bottom-to-top",
      itemOpacity: 0.85,
      symbolSize: 10,
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
