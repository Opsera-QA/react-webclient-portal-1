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

kpiLovHelpers.filters = [
  { id: { type: "tags", value: [] }, label: "Tags" },
  { id: { type: "date", value: null }, label: "Date" },
  { id: { type: "goals", value: {} }, label: "Goals" },
  { id: { type: "jenkins-result", value: "" }, label: "Jenkins Result" },
  { id: { type: "jenkins-job-url", value: "" }, label: "Jenkins Build URL" },
  { id: { type: "jenkins-build-number", value: [] }, label: "Jenkins Build Number" },
  { id: { type: "jira-issue-type", value: [] }, label: "Jira Issues Type" },
  { id: { type: "jira-issue-components", value: [] }, label: "Jira Issues Components" },
  { id: { type: "jira-issue-labels", value: [] }, label: "Jira Issues Labels" },
  { id: { type: "jira-issue-status", value: [] }, label: "Jira Issue Status" },
  { id: { type: "jira-issue-start-status", value: [] }, label: "Jira Issue Start Status" },
  { id: { type: "jira-issue-done-status", value: [] }, label: "Jira Issue Done Status" },
  { id: { type: "sonar-project-key", value: [] }, label: "Sonar Project Keys" },
  { id: { type: "domain", value: [] }, label: "Domain" },
  { id: { type: "application", value: [] }, label: "Application" },
  { id: { type: "release", value: [] }, label: "Release" },
  { id: { type: "sprint", value: [] }, label: "Sprint" },
  { id: { type: "project", value: [] }, label: "Project" },
  { id: { type: "selenium-test-suites", value: [] }, label: "Selenium Test Suites" },
  { id: { type: "sonar-project-languages", value: [] }, label: "Sonar Project Languages" },
  { id: { type: "servicenow-priorities", value: [] }, label: "Service Now Priorities" },
  { id: { type: "servicenow-tools", value: "" }, label: "Service Now Tool" },
  { id: { type: "servicenow-assignment-groups", value: [] }, label: "Service Now Assignment Groups" },
  { id: { type: "servicenow-service-offerings", value: [] }, label: "Service Now Service Offerings" },
  { id: { type: "servicenow-configuration-items", value: [] }, label: "Service Now Configuration Items" },
  { id: { type: "servicenow-business-services", value: [] }, label: "Service Now Business Services" },
];

kpiLovHelpers.getFilterById = (id) => {
  return kpiLovHelpers.filters.find((filter) => filter.id === id);
};

kpiLovHelpers.categories = [
  { value: "pipeline", text: "Pipeline" },
  { value: "security", text: "Security" },
  { value: "quality", text: "Quality" },
  { value: "software-development", text: "Software Development" },
  { value: "software-testing", text: "Software Testing" },
  { value: "source-code", text: "Source Code" },
  { value: "operations", text: "Operations" },
  { value: "planning", text: "Planning" },
];

kpiLovHelpers.getCategoryById = (id) => {
  return kpiLovHelpers.categories.find((filter) => filter.value === id);
};

export default kpiLovHelpers;
