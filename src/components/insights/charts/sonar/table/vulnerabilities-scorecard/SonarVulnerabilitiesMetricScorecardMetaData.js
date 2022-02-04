const SonarVulnerabilitiesMetricScorecardMetaData = {
  idProperty: "_id",
  type: "Sonar Vulnerabilities Metric Scorecard",
  fields: [
    {
      label: "Run",
      id: "run_count",
    },
    {
      label: "Pipeline Id",
      id: "pipelineId",
    },
    {
      label: "Pipeline",
      id: "pipelineName",
    },
    {
      label: "Project",
      id: "projectName",
    },
    {
      label: "Date",
      id: "timestamp",
    },
    {
      label: "Vulnerabilities",
      id: "sonarLatestMeasureValue",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Language",
      id: "sonarPrimaryLanguage",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
  ],
  newObjectFields: {},
};

export default SonarVulnerabilitiesMetricScorecardMetaData;
