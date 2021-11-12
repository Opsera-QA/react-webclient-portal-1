const BuildStatisticsActionableInsightsMetadata = {
    idProperty: "_id",
    type: "Opsera Pipeline Builds Report",
    fields: [
      {
        label: "Pipeline",
        id: "pipelineName",
      },
      {
        label: "Total Executions",
        id: "total",
      },
      {
        label: "Successful Executions",
        id: "success",
      },
      {
        label: "Failed Executions",
        id: "failure",
      },
      {
        label: "Total Time to Build",
        id: "duration",
      },
      {
        label: "Time to Resolve Builds",
        id: "timeToResolve",
      }      
    ],
    newObjectFields: {},
};
  
export default BuildStatisticsActionableInsightsMetadata;
  