export default {
    axisBottom: {
      format: (d) => (typeof d === "string" ? d.substring(0, 11) : ""),
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -15,
      legend: "Time",
      legendOffset: 36,
      legendPosition: "middle",
    },
    axisLeft: {
      format: (d) => d + "MB",
      orient: "left",
      tickSize: 5,
      tickValues: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Out Network Usage (MB)",
      legendOffset: -85,
      legendPosition: "middle",
    },
    legends: [
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
      // {
      //   anchor: "bottom",
      //   direction: "row",
      //   justify: false,
      //   translateX: -200,
      //   translateY: 65,
      //   itemsSpacing: 0,
      //   itemDirection: "left-to-right",
      //   itemWidth: 255,
      //   itemHeight: 20,
      //   itemOpacity: 0.75,
      //   symbolSize: 12,
      //   symbolShape: "circle",
      //   symbolBorderColor: "rgba(0, 0, 0, .5)",
      //   effects: [
      //     {
      //       on: "hover",
      //       style: {
      //         itemBackground: "rgba(0, 0, 0, .03)",
      //         itemOpacity: 1,
      //       },
      //     },
      //   ],
      // },
    ],
  };
  