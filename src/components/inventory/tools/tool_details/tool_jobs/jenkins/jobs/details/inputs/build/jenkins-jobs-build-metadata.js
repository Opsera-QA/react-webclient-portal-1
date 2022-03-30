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
      formText: "Currently, only .Net and Coverity Scan supports windows agent",
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArgs",
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
