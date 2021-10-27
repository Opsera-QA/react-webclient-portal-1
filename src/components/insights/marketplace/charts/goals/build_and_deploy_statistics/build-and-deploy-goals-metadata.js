const buildAndDeployGoalsMetadata = {
    type: "Salesforce Duration By Stage Goals",
    fields: [
      {
        label: "Build Success Rate",
        id: "build_success_rate"
      },
      {
        label: "Average Builds per Day",
        id: "average_builds"
      },
      {
        label: "Deployment Success Rate",
        id: "deployment_success_rate"
      },
      {
        label: "Average Deployments per Day",
        id: "average_deployments"
      },
    ],
    newObjectFields: {
      build_success_rate: 0,
      average_builds: 0,
      deployment_success_rate: 0,
      average_deployments: 0
    }
  };
  
  export default buildAndDeployGoalsMetadata;