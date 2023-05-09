export default (users, colorScheme) => ({
  keys: users,
  colors: {
    type: "sequential",
    scheme: colorScheme
  },
  indexBy: "date",
  forceSquare: true,
  cellOpacity: 1,
  cellComponent: "circle",
  hoverTarget: "cell",
  cellHoverOtherOpacity: .25,
  legends: [
    {
      anchor: "top-right",
      direction: "column",
      justify: false,
      translateX: 40,
      translateY: -60,
      itemsSpacing: 0,
      itemDirection: "right-to-left",
      itemWidth: 80,
      itemHeight: 50,
      itemOpacity: 1,
      symbolSize: 10,
      symbolShape: "square",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
    },
  ],
  margin: {
    top: 10,
    right: 40,
    bottom: 60,
    left: 40
  },
  labelTextColor: "#ffffff"
});