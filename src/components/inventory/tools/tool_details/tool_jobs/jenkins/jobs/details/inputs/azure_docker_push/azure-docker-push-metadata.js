const AzureDockerPushJobMetadata = {
  type: "Jenkins SFDC Job",
  fields: [
    {
      label: "Build Step",
      id: "buildType",
      isRequired: true,
    },
    {
      label: "Agent Label",
      id: "agentLabels",
    },
  ],
  newObjectFields: {
    buildType: "docker",
    agentLabels: "",
  },
};

export default AzureDockerPushJobMetadata;
