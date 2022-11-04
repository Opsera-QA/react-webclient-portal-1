const GitlabPipelineStatisticsActionableInsightsMetadata = {
    idProperty: "_id",
    type: "Gitlab Pipeline Table Report",
    fields: [
      {
        label: "Id",
        id: "pipelineId",
      },
      {
        label: "Duration",
        id: "pipelineDuration",
      },
      {
        label: "Status",
        id: "overallStatus",
      },
      {
        label: "Commit Id",
        id: "commitId",
      },
      {
        label: "Branch",
        id: "branch",
      },
      {
        label: "Completed Time",
        id: "pipelineEndTime",
      }      
    ],
    newObjectFields: {},
};
  
export default GitlabPipelineStatisticsActionableInsightsMetadata;
  