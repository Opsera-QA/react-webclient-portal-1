const CoverityActionableMetadata = {
  idProperty: "_id",
  type: "Coverity Issues Table Report",
  fields: [
    {
      label: "Project Key",
      id: "project",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Recent Scan",
      id: "run",
    },
    {
      label: "Trend",
      id: "trend",
    },
    {
      label: "Total Issues",
      id: "total_issues",
    },
    {
      label: "Quality",
      id: "quality_issues",
    },
    {
      label: "Security",
      id: "security_issues",
    }
  ],
  newObjectFields: {},
};

export default CoverityActionableMetadata;