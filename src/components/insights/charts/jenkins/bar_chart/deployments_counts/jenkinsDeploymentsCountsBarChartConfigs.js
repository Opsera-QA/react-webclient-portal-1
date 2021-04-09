// export default {
//   keys: ["success", "failed"],
//   margin: {
//     top: 50,
//     right: 130,
//     bottom: 50,
//     left: 80,
//   },
//   defs: [
//     {
//       id: "dots",
//       type: "patternDots",
//       background: "inherit",
//       color: "#38bcb2",
//       size: 4,
//       padding: 1,
//       stagger: true,
//     },
//     {
//       id: "lines",
//       type: "patternLines",
//       background: "inherit",
//       color: "#eed312",
//       rotation: -45,
//       lineWidth: 6,
//       spacing: 10,
//     },
//   ],
//   fill: [
//     {
//       match: {
//         id: "fries",
//       },
//       id: "dots",
//     },
//     {
//       match: {
//         id: "sandwich",
//       },
//       id: "lines",
//     },
//   ],
//   axisBottom: {
//     orient: "bottom",
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: -65,
//     legendOffset: 46,
//     legendPosition: "middle",
//   },
//   axisLeft: {
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     legend: "Deployment Count",
//     legendPosition: "middle",
//     legendOffset: -55,
//   },
//   legends: [
//     {
//       dataFrom: "keys",
//       anchor: "bottom-right",
//       direction: "column",
//       justify: false,
//       translateX: 120,
//       translateY: 0,
//       itemsSpacing: 2,
//       itemWidth: 100,
//       itemHeight: 20,
//       itemDirection: "left-to-right",
//       itemOpacity: 0.85,
//       symbolSize: 20,
//       effects: [
//         {
//           on: "hover",
//           style: {
//             itemOpacity: 1,
//           },
//         },
//       ],
//     },
//   ],
// };

export default () => ({
  keys: ["Success", "Failed"],
  indexBy: "buildTime",
  colorBy: "id",
  xScale: { 
    type: "point"
  },
  yScale: { 
    type: "linear", 
    min: "auto", 
    max: "auto", 
    stacked: false, 
    reverse: false
  },
  colors:({ id, data }) => data[`${id}_color`]
});