const kpiLovHelpers = {};

kpiLovHelpers.chartTypes = [
  {id: "bar-chart", label: "Bar Chart"},
  {id: "line-chart", label: "Line Chart"},
  {id: "calendar", label: "Calendar"},
  {id: "table", label: "Table"},
  {id: "number", label: "Number"}
];

kpiLovHelpers.getChartTypeById = (id) => {
  return kpiLovHelpers.chartTypes.find((chartType) => chartType.id === id);
};

kpiLovHelpers.filters = [
  {id: {"type": "tags", "value": null}, label: "Date"},
  {id: {"type": "date", "value": null}, label: "Tag"},
];

kpiLovHelpers.getFilterById = (id) => {
  return kpiLovHelpers.filters.find((filter) => filter.id === id);
};

kpiLovHelpers.categories = [
  {id: "pipeline", label: "Pipeline"},
  {id: "security", label: "Security"},
  {id: "software-development", label: "Software Development"},
  {id: "software-testing", label: "Software Testing"},
  {id: "source-code", label: "Source Code"},
  {id: "operations", label: "Operations"},
  {id: "planning", label: "Planning"}
];

kpiLovHelpers.getCategoryById = (id) => {
  return kpiLovHelpers.categories.find((filter) => filter.id === id);
};

export default kpiLovHelpers;