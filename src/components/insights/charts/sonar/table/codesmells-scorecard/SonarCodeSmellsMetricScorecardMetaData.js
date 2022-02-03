const SonarCodeSmellsMetricScorecardMetaData = {
  idProperty: "_id",
  type: "Sonar Code Smells Metric Scorecard",
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
      label: "Code Smells",
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
  ],
  newObjectFields: {},
};

export default SonarCodeSmellsMetricScorecardMetaData;
