// TODO
const GitScrapperMetricScorecardMetaData = {
  idProperty: "_id",
  type: "Git Scrapper Metric Scorecard",
  fields: [
    {
      label: "Total Scans",
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
      label: "Total Issues",
      id: "gitScrapperLatestMeasureValue",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Language",
      id: "gitScrapperPrimaryLanguage",
    },
    {
      label: "Library Used",
      id: "libraryName",
    },
    {
      label: "Repository Name",
      id: "repositoryName",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
  ],
  newObjectFields: {},
};

export default GitScrapperMetricScorecardMetaData;
