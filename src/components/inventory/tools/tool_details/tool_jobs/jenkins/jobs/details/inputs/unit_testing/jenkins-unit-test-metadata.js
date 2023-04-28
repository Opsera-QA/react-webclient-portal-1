const JenkinsUnitTestJobMetadata = {
  type: "Jenkins Unit Test Job",
  fields: [
    {
      label: "Build Type",
      id: "buildType",
      isRequired: true,
    },
    {
      label: "Build Tool",
      id: "buildTool",
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
      formText: "Currently, the only supported Agent Label is Ubuntu Agent",
    },
    {
      label: "Use Custom Maven Settings",
      id: "customMavenSettings"
    },
    {
      label: "Custom Script",
      id: "scriptId",
      isRequiredFunction: (model) => {
        return model?.getData("customMavenSettings") === true;
      },
    },
  ],
  newObjectFields: {
    buildType: "",
    buildTool: "",
    gradleTask:"",
    mavenTask:"",
    agentLabels: "",
    customMavenSettings: false,
    scriptId: "",
  },
};

export default JenkinsUnitTestJobMetadata;
