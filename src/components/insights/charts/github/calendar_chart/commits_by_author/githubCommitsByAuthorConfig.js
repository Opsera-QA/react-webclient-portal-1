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
    top: 10,
    right: 40,
    bottom: 60,
    left: 40
  }
});