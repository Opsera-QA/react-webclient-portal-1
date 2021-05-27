const SonarBugsMetricScorecardMetaData = {
  idProperty: "_id",
  type: "Sonar Bugs Metric Scorecard",
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
      label: "Bugs",
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

export default SonarBugsMetricScorecardMetaData;
