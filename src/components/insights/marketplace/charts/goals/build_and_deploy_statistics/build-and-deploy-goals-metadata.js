const buildAndDeployGoalsMetadata = {
    type: "Salesforce Duration By Stage Goals",
    fields: [
      {
        label: "Build Success Rate % Goal",
        id: "build_success_rate",
        minNumber: 0,
        maxNumber: 100
      },
      {
        label: "Average Builds per Day Goal",
        id: "average_builds",
        minNumber: 0,
        maxNumber: 200
      },
      {
        label: "Deployment Success Rate % Goal",
        id: "deployment_success_rate",
        minNumber: 0,
        maxNumber: 100
      },
      {
        label: "Average Deployments per Day Goal",
        id: "average_deployments",
        minNumber: 0,
        maxNumber: 200
      },
    ],
    newObjectFields: {
      build_success_rate: 90,
      average_builds: 1,
      deployment_success_rate: 90,
      average_deployments: 1
    }
  };
  
  export default buildAndDeployGoalsMetadata;