const JenkinsGenericJobMetadata = {
  type: "Jenkins Job Configuration",
  fields: [
    {
      label: "Agent Label",
      id: "agentLabels",
      formText: "Currently, the only supported Agent Label is Ubuntu Agent",
    },
  ],
  newObjectFields: {
    agentLabels: "generic-linux",
  },
};

export default JenkinsGenericJobMetadata;
