const GitScrapperActionableMetadata = {
    idProperty: "_id",
    type: "Git Scrapper Issues Table Report",
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
        label: "Run Count",
        id: "run",
      },
      {
        label: "Timestamp",
        id: "timestamp",
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
  
  export default GitScrapperActionableMetadata;
  