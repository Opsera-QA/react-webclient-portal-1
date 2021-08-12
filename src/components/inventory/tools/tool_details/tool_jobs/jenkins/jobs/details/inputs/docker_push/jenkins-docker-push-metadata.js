const JenkinsDockerPushJobMetadata = {
  type: "Jenkins Build Job",
  fields: [
    {
      label: "Build Type",
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

export default JenkinsDockerPushJobMetadata;
  