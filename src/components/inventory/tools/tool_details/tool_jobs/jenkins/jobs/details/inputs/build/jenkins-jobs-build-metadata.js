const JenkinsBuildJobMetadata = {
  type: "Jenkins Build Job",
  fields: [
    {
      label: "Build Type",
      id: "buildType",
      isRequired: true,
    },
    {
      label: "Gradle Task",
      id: "gradleTask",
    },
    {
      label: "Maven Task",
      id: "mavenTask",
    },
    {
      label: "Agent Label",
      id: "agentLabels",
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArgs",
      formText: "Currently, only .Net and Coverity Scan supports windows agent",
    },
    {
      label: "Build Step",
      id: "jobType",
    },
  ],
  newObjectFields: {
    commandLineArgs: "",
    mavenTask: "",
    buildType: "",
    gradleTask: "",
    agentLabels: "",
  },
};

export default JenkinsBuildJobMetadata;
