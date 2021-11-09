const salesforceDurationByStageMetadata = {
    type: "Salesforce Duration By Stage Goals",
    fields: [
      {
        label: "Average Duration of Build (minutes)",
        id: "average_builds"
      },
      {
        label: "Average Duration of Deployment (minutes)",
        id: "average_deployments"
      },
    ],
    newObjectFields: {
      average_builds: 0,
      average_deployments: 0
    }
  };
  
  export default salesforceDurationByStageMetadata;
