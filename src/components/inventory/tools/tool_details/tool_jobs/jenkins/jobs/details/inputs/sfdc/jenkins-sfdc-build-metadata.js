const JenkinsSfdcJobMetadata = {
  type: "Jenkins SFDC Job",
  fields: [
    {
      label: "Build Step",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Agent Label",
      id: "agentLabels",
    },
  ],
  newObjectFields: {
    jobType: "",
    agentLabels: "",
  },
};

export default JenkinsSfdcJobMetadata;
