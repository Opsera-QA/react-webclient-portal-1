export default (users) => ({
  keys: users,
  colors: {
    type: "sequential",
    scheme: "purple_orange",
  },
  indexBy: "date",
  forceSquare: true,
  cellOpacity: 1,
  cellShape: "circle",
  hoverTarget: "cell",
  cellHoverOtherOpacity: .25,
  margin: {
    top: 10,
    right: 40,
    bottom: 60,
    left: 40
  },
  labelTextColor: "#ffffff"
});