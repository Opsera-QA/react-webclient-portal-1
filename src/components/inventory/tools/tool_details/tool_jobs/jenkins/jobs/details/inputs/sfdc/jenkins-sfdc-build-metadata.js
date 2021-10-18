const JenkinsSfdcJobMetadata = {
  type: "Jenkins Salesforce Job",
  fields: [
    {
      label: "Build Step",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Agent Label",
      id: "agentLabels",
      formText: "Currently, the only supported Agent Label is Ubuntu Agent",
    },
  ],
  newObjectFields: {
    jobType: "",
    agentLabels: "",
  },
};

export default JenkinsSfdcJobMetadata;
