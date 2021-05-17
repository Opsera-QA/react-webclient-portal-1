export default (getColor) => ({
    keys: ["Successful", "Failed"],
    indexBy: "_id",
    layout: "horizontal",
    colors: getColor
  });