const SonarPipelineTableMetadata = {
  idProperty: "_id",
  type: "Sonar Pipeline Table Report",
  fields: [
    {
      label: "Project Name",
      id: "project",
    },
    {
      label: "Recent Scan",
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
      label: "Remediation Effort",
      id: "total_effort",
    },
  ],
  newObjectFields: {},
};

export default SonarPipelineTableMetadata;