export default (defaultColor, failColor, warningColor) => ({
  keys: ["Successful", "Failed", "Aborted", "Unstable"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors: (bar) => {
    switch (bar.id) {
      case "Successful": return defaultColor;
      case "Failed": return failColor;
      default: return warningColor;
    }
  }
});