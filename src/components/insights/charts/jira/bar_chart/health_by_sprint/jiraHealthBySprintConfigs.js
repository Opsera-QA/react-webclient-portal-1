export default () => ({
  keys: ["To Do", "In Development", "In Progress", "Peer Review", "Testing", "Done", "Selected for Development", "Production Deployment"],
  indexBy: "_id",
  colorBy: "id",
  layout: "horizontal",
  colors:({ id, data }) => data[`${id}_color`]
});