const SonarPipelineTableMetadata = {
  idProperty: "_id",
  type: "Sonar Pipeline Table Report",
  fields: [
    {
      label: "Project",
      id: "project",
    },
    {
      label: "Pipeline Name",
      id: "pipelineId",
    },
    {
      label: "Timestamp",
      id: "currentScanIssuesCount",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Critical",
      id: "critical",
    },
    {
      label: "Blocker",
      id: "blocker",
    },
    {
      label: "Major",
      id: "major",
    },
    {
      label: "Minor",
      id: "minor",
    },
    {
      label: "Info",
      id: "info",
    },
    {
      label: "Remediation Effort (in minutes)",
      id: "effort",
    },
  ],
  newObjectFields: {},
};

export default SonarPipelineTableMetadata;