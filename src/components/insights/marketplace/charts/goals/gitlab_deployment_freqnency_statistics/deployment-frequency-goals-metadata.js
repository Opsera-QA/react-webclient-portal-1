const deploymentFrequencyGoalsMetadata = {
    type: "Deployment Frequency Goals",
    fields: [
      {
        label: "Average Deployments per Day Goal",
        id: "deployment_frequency_rate",
        minNumber: 0,
        maxNumber: 200
      },
    ],
    newObjectFields: {
      deployment_frequency_rate: 40
    }
  };
  
  export default deploymentFrequencyGoalsMetadata;