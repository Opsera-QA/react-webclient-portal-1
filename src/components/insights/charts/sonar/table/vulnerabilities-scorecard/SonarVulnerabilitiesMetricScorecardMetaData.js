const SonarCodeSmellsMetricScorecardMetaData = {
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
      label: "Project",
      id: "projectName",
    },
    {
      label: "Date",
      id: "timestamp",
    },
    {
      label: "Vulnerabilities (Latest Scan)",
      id: "sonarLatestMeasureValue",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Primary Language",
      id: "sonarPrimaryLanguage",
    },
  ],
  newObjectFields: {},
};

export default SonarCodeSmellsMetricScorecardMetaData;
