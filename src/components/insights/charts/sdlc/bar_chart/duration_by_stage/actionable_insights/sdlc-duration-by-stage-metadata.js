const SonarPipelineTableMetadata = {
    idProperty: "_id",
    type: "SDLC Duration By Stage Table Report",
    fields: [
      {
        label: "Pipeline",
        id: "name",
      },
      {
        label: "Total Executions",
        id: "total",
      },
      {
        label: "Successful Executions",
        id: "total_success",
      },
      {
        label: "Failed Executions",
        id: "total_failed",
      },
      {
        label: "Total Time to Build (hrs)",
        // label: "Mean Time to Build (min)",
        id: "duration",
      },
      {
        label: "Total Time to Resolve Builds (hrs)",
        // label: "Mean Time to Resolve Builds (min)",
        id: "time_to_resolve",
      }
    ],
    newObjectFields: {},
  };
  
  export default SonarPipelineTableMetadata;