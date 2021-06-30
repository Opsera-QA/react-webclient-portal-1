const SonarDebtRatioMetaData = {
  idProperty: "_id",
  type: "Sonar Bugs Metric Scorecard",
  fields: [
    {
      label: "Run",
      id: "run_count",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Pipeline Id",
      id: "pipelineId",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Project",
      id: "projectName",
    },
    {
      label: "Date",
      id: "date",
    },
    {
      label: "Technical Debt Ratio",
      id: "technical_debt_ratio",
    },
  ],
  newObjectFields: {},
};

export default SonarDebtRatioMetaData;
