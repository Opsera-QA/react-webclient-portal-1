const JenkinsSfdcJobMetadata = {
  type: "Jenkins SFDC Job",
  fields: [
    {
      label: "Build Step",
      id: "jobType",
      isRequired: true,
    },
  ],
  newObjectFields: {
    buildType: "",
  },
};

export default JenkinsSfdcJobMetadata;
