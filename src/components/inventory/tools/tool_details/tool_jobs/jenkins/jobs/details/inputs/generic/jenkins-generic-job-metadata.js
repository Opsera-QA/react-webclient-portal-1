const JenkinsGenericJobMetadata = {
  type: "Jenkins Job Configuration",
  fields: [
    {
      label: "Agent Label",
      id: "agentLabels",
      formText: "Currently, only .Net and Coverity Scan supports windows agent",
    },
  ],
  newObjectFields: {
    agentLabels: "",
  },
};

export default JenkinsGenericJobMetadata;
