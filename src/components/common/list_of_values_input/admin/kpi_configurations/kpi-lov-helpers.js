const kpiLovHelpers = {};

kpiLovHelpers.chartTypes = [
  {id: "bar-chart", label: "Bar Chart"},
  {id: "line-chart", label: "Line Chart"},
  {id: "pie-chart", label: "Pie Chart"},
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


kpiLovHelpers.dataPoints = [
  {id: {"value": "cypress-tests-run", "name": "Cypress : Tests Run", "type": "number" }, label: "Cypress : Tests Run"},
  {id: {"value": "cypress-tests-passed", "name": "Cypress : Tests Passed", "type": "number" }, label: "Cypress : Tests Passed"},
  {id: {"value": "cypress-tests-failed", "name": "Cypress : Tests Failed", "type": "number" }, label: "Cypress : Tests Failed"},
  {id: {"value": "cypress-pass-rate", "name": "Cypress : Pass Rate", "type": "percent" }, label: "Cypress : Pass Rate"},
];

kpiLovHelpers.categories = [
  {id: "pipeline", label: "Pipeline"},
  {id: "security", label: "Security"},
  {id: "quality", label: "Quality"},
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