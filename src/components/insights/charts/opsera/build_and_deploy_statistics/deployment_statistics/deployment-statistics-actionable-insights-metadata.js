const DeploymentStatisticsActionableInsightsMetadata = {
    idProperty: "_id",
    type: "Opsera Pipeline Deployments Report",
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
        label: "Total Time to Deploy",
        id: "duration",
      },
      {
        label: "Time to Resolve Deployments",
        id: "timeToResolve",
      }      
    ],
    newObjectFields: {},
};
  
export default DeploymentStatisticsActionableInsightsMetadata;
  