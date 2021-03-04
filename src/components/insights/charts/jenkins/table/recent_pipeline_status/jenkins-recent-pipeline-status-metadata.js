const jenkinsRecentPipelineStatusMetadata = {
    idProperty: "_id",
    type: "Jenkins Recent Pipeline Status",
    fields: [
      {
        label: "Run",
        id: "data_buildNum"
      },
      {
        label: "Pipeline Name",
        id: "data_projectName"
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
        id: "data_result",
      },
    ],
    newObjectFields: {
    }
  };
  
  export default jenkinsRecentPipelineStatusMetadata;