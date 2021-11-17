const kpiLovHelpers = {};

kpiLovHelpers.chartTypes = [
  { id: "bar-chart", label: "Bar Chart" },
  { id: "line-chart", label: "Line Chart" },
  { id: "pie-chart", label: "Pie Chart" },
  { id: "calendar", label: "Calendar" },
  { id: "table", label: "Table" },
  { id: "number", label: "Number" },
];

kpiLovHelpers.getChartTypeById = (id) => {
  return kpiLovHelpers.chartTypes.find((chartType) => chartType.id === id);
};

export default kpiLovHelpers;
