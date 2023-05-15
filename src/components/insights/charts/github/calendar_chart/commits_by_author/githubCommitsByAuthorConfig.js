export default (colorScheme) => ({
  colors: {
    type: "sequential",
    scheme: colorScheme,
    minValue: 0,
  },
  forceSquare: true,
  cellComponent: "circle",
  hoverTarget: "cell",
  legends: [
    {
      anchor: "top-right",
      direction: "column",
      translateX: 40,
      translateY: 0,
    },
  ],
  margin: {
    top: 0,
    right: 80,
    bottom: 80,
    left: 100
  },
  labelTextColor: "#ffffff"
});