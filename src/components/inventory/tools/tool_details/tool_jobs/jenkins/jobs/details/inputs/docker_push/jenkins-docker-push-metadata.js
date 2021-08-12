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
      formText: "Currently, the only supported Agent Label is Ubuntu Agent",
    },
  ],
  newObjectFields: {
    buildType: "docker",
    agentLabels: "",
  },
};

export default JenkinsDockerPushJobMetadata;
  