const salesforceDurationByStageMetadata = {
    type: "Salesforce Duration By Stage Goals",
    fields: [
      {
        label: "Goal for average duration of Package Creation in minutes:",
        id: "average_builds"
      },
      {
        label: "Goal for average duration of Deployments in minutes:",
        id: "average_deployments"
      },
    ],
    newObjectFields: {
      average_builds: 0,
      average_deployments: 0
    }
  };
  
  export default salesforceDurationByStageMetadata;
