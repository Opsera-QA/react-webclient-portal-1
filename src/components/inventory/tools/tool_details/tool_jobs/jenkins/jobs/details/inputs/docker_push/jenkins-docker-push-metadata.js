const JenkinsDockerPushJobMetadata = {
  type: "Jenkins Build Job",
  fields: [
    {
      label: "Build Type",
      id: "buildType",
      isRequired: true,
    },
  ],
  newObjectFields: {
    buildType: "docker",
  },
};

export default JenkinsDockerPushJobMetadata;
  