const opseraRecentPipelineStatusMetadata = {
  idProperty: "_id",
  type: "Opsera Recent Pipeline Status",
  fields: [
    {
      label: "Run",
      id: "run_count"
    },
    {
      label: "Pipeline Name",
      id: "pipeline_name"
    },
    {
      label: "Completed At",
      id: "timestamp"
    },
    {
      label: "Duration (Mins)",
      id: "duration",
    },
    {
      label: "Result",
      id: "status",
    },
  ],
  newObjectFields: {
  }
};

export default opseraRecentPipelineStatusMetadata;