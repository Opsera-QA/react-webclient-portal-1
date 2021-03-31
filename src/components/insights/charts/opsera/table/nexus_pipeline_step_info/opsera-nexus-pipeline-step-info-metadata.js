const opseraRecentPipelineStatusMetadata = {
  idProperty: "_id",
  type: "Opsera Nexus Pipeline Step Info",
  fields: [
    {
      label: "Run",
      id: "runCount",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    // {
    //   label: "Timestamp",
    //   id: "timestamp",
    // },
    {
      label: "Artifact Name",
      id: "artifactName",
    },
    {
      label: "Project Name",
      id: "repositoryName",
    },
    {
      label: "Project Group",
      id: "repositoryGroup",
    },
    {
      label: "Package",
      id: "packageId",
    },
  ],
  newObjectFields: {},
};

export default opseraRecentPipelineStatusMetadata;
