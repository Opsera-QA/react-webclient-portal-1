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
  {id: {"type": "tags", "value": []}, label: "Tags"},
  {id: {"type": "date", "value": null}, label: "Date"},
  {id: {"type": "jenkins-result", "value": ""}, label: "Jenkins Result"},
  {id: {"type": "jenkins-job-url", "value": ""}, label: "Jenkins Build URL"},
  {id: {"type": "jenkins-build-number", "value": []}, label: "Jenkins Build Number"}
];

kpiLovHelpers.getFilterById = (id) => {
  return kpiLovHelpers.filters.find((filter) => filter.id === id);
};

kpiLovHelpers.categories = [
  {value: "pipeline", text: "Pipeline"},
  {value: "security", text: "Security"},
  {value: "quality", text: "Quality"},
  {value: "software-development", text: "Software Development"},
  {value: "software-testing", text: "Software Testing"},
  {value: "source-code", text: "Source Code"},
  {value: "operations", text: "Operations"},
  {value: "planning", text: "Planning"}
];

kpiLovHelpers.getCategoryById = (id) => {
  return kpiLovHelpers.categories.find((filter) => filter.value === id);
};

export default kpiLovHelpers;