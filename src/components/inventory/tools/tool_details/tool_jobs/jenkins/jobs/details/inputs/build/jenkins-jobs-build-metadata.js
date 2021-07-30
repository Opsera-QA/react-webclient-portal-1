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
    },
    {
      label: "Build Step",
      id: "jobType",
    },
  ],
  newObjectFields: {
    commandLineArgs:"",
    jobType:"",
    mavenTask:"",
    buildType:"",
    gradleTask:"",
    agentLabels: "",
  },
};

export default JenkinsBuildJobMetadata;
